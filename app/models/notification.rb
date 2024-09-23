class Notification < ApplicationRecord
  belongs_to :user

  validates :notification_type, presence: true

  after_create_commit { NotificationBroadcastJob.perform_later(self) }

end
