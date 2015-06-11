# coding: utf-8
require 'sinatra'
require 'sinatra/streaming'
require 'json'

require './lib/bunny_client.rb'

set server: 'thin', connections: [], bunny_clients: []
set :public_folder, proc { File.join(root, '/assets') }

def send_data(params)
  object = params.to_json
  data = "data: #{object}\n\n".freeze
  settings.connections.each { |out| out << data }
end

def create_bunny_client
  settings.bunny_clients << BunnyClient.new(settings).start
end

get '/' do
  erb :bubbles
end

get '/frame' do
  origin = params[:origin]
  response.headers['X-Frame-Options'] = "ALLOW-FROM #{origin}"
  erb :bubbles,
      locals: {
        frame: true,
        frame_urls: params[:frame_urls],
        duration: (params[:duration] || (5 * 1000 * 60)).to_i
      }
end

get '/style.css' do
  content_type 'text/css'
  erb :'style.css'
end

get '/stream', provides: 'text/event-stream' do
  create_bunny_client if settings.bunny_clients.empty?

  stream :keep_open do |out|
    settings.connections << out

    puts "A new challenger has arrived. Now we're #{settings.connections.size}."

    out.callback do
      settings.connections.delete(out)
    end
  end
end

post '/broadcast' do
  return 405 unless params[:type]
  send_data(params)
  response.headers['Access-Control-Allow-Origin'] = '*'
  201
end

post '/random' do
  count = params[:count].to_i || 1
  threads = []

  count.times do
    threads << Thread.new do
      sleep rand(10)
      send_data(type: rand(1_000_000), size: rand(100))
    end
  end

  threads.join(&:value)
  201
end
