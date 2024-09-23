class AddAnnivesaryToNotificationPreference < ActiveRecord::Migration[5.2]
  def change
    add_column :notification_preferences, :receive_annivesary_notifications, :boolean
  end
end
