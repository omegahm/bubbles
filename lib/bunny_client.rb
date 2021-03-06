require 'bunny'
require 'date'
require 'eventmachine'

class BunnyClient
  attr_reader :settings

  def initialize(settings)
    @settings = settings
  end

  def start
    return if ENV['RABBIT_MQ_URL'].nil?

    Thread.new { EventMachine.run }
    sleep 0.5 # Just so that EventMachine can start up.
    start_ticking
  end

  private

  def channel
    @channel ||= rabbit_connection.create_channel.tap { |c| c.prefetch(20) }
  end

  def exchange
    @exchange ||= channel.topic('lb', auto_delete: false, durable: true)
  end

  def start_ticking
    EventMachine.next_tick do
      binding.subscribe(manual_ack: true) do |info, meta, _payload|
        new_event(info, meta)
        channel.ack(info.delivery_tag, false)
      end
    end
  end

  def binding
    channel.queue(
      "bubbles-#{SecureRandom.uuid}",
      exclusive: true,
      auto_delete: true,
      arguments: {
        'x-message-ttl' => 5000
      }
    ).bind(exchange, routing_key: '#')
  end

  def new_event(info, meta)
    object = parse_info(info, meta).to_json

    data = "data: #{object}\n\n"
    connections.each { |out| out << data }
  end

  def parse_info(info, meta)
    {
      type: meta[:type] || info[:routing_key].to_s
    }
  end

  def connections
    settings.connections
  end

  def rabbit_connection
    @rabbit_connection ||= Bunny.new(ENV['RABBIT_MQ_URL']).tap(&:start)
  end
end
