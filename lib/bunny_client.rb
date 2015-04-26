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

  def start_ticking
    EventMachine.next_tick do
      puts 'Created bunny connection'

      channel  = rabbit_connection.create_channel
      exchange = channel.topic('lb', auto_delete: false, durable: true)

      rabbit = channel.queue("bubbles-#{SecureRandom.uuid}",
        exclusive: true,
        auto_delete: true,
        arguments: {
          "x-message-ttl" => 5000
        }).bind(exchange, routing_key: '#')

      rabbit.subscribe do |info, _meta, _payload|
        new_event(info)
      end
    end
  end

  def new_event(info)
    params = parse_info(info)
    object = params.to_json

    data = "data: #{object}\n\n".freeze
    connections.each { |out| out << data }
  end

  def parse_info(info)
    {
      type: info[:routing_key].to_s
    }
  end

  def connections
    settings.connections
  end

  def rabbit_connection
    @rabbit_connection ||= Bunny.new(ENV['RABBIT_MQ_URL']).tap(&:start)
  end
end
