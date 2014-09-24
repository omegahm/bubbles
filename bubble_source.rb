# coding: utf-8
require 'sinatra'
require 'sinatra/streaming'
require 'json'

set server: 'thin', connections: [], id: 0
set :public_folder, Proc.new { File.join(root, "/assets") }

def send_data(id, type)
  object = { id: id.to_s, type: type.to_s }.to_json
  data = "data: #{object}\n\n"
  settings.connections.each { |out| out << data }
end

get '/' do
  erb :bubbles
end

get '/stream', provides: 'text/event-stream' do
  stream :keep_open do |out|
    settings.connections << out
    puts "A new challenger has arrived. Now we're #{settings.connections.size}."
    out.callback { settings.connections.delete(out) }
  end
end

post '/broadcast' do
  return 405 unless params[:id] && params[:type]
  send_data(params[:id], params[:type])
  201
end

post '/random' do
  settings.id += 1
  send_data(settings.id, rand(1_000_000))
  201
end
