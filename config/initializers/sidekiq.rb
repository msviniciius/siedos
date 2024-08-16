# config/initializers/sidekiq.rb
require 'sidekiq'
require 'sidekiq/web'

Sidekiq.configure_server do |config|
  config.redis = { url: ENV['REDIS_URL'] }
end

Sidekiq.configure_client do |config|
  config.redis = { url: ENV['REDIS_URL'] }
end

Sidekiq::Web.use Rack::Auth::Basic do |username, password|
  username == ENV['SIDEKIQ_USERNAME'] && password == ENV['SIDEKIQ_PASSWORD']
end if ENV['SIDEKIQ_USERNAME'].present? && ENV['SIDEKIQ_PASSWORD'].present?
