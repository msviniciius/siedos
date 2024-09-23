class CreateNotificationPreferences < ActiveRecord::Migration[5.2]
  def change
    create_table :notification_preferences do |t|
      t.references :user, null: false, foreign_key: true
      t.boolean :receive_profile_update_notifications, default: true
      t.boolean :receive_document_notifications, default: true
      t.boolean :receive_general_notifications, default: true
      t.timestamps
    end
  end
end
