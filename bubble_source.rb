# coding: utf-8
require 'sinatra'
require 'sinatra/streaming'
require 'json'

set server: 'thin', connections: []
set :public_folder, Proc.new { File.join(root, '/assets') }

def send_data(type, color = nil)
  object = { type: type.to_s, color: color }.to_json
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
  return 405 unless params[:type]
  send_data(params[:type], params[:color])
  201
end

post '/random' do
  send_data(rand(1_000_000))
  201
end
