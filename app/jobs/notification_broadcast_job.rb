class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  def perform(notification)
    ActionCable.server.broadcast "notifications_#{notification.user_id}", {
      title: notification.title,
      message: notification.message,
      created_at: notification.created_at.strftime("%H:%M")
    }
  end
end
