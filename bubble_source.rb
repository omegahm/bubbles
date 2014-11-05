# coding: utf-8
require 'sinatra'
require 'sinatra/streaming'
require 'json'

set server: 'thin', connections: []
set :public_folder, Proc.new { File.join(root, '/assets') }

def send_data(params)
  object = params.to_json
  data = "data: #{object}\n\n"
  settings.connections.each { |out| out << data }
end

get '/' do
  erb :bubbles
end

get '/style.css' do
  content_type 'text/css'
  erb :'style.css'
end

get '/stream', provides: 'text/event-stream' do
  stream :keep_open do |out|
    settings.connections << out
    puts "A new challenger has arrived. Now we're #{settings.connections.size}."
    out.callback { settings.connections.delete(out) }
  end
end

post '/broadcast' do
  return 405 unless params[:type]
  send_data(params)
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
    threads.join(&:value)
  end
  201
end
