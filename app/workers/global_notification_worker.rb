class GlobalNotificationWorker
  include Sidekiq::Worker

  def perform(title, message)
    User.find_each(batch_size: 1000) do |user|
      Notification.create!(
        user_id: user.id, 
        title: title, 
        message: message, 
        notification_type: 'GeneralNotification'
      )
    end
  end
end
