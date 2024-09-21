class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.string :title, null: false
      t.text :message
      t.boolean :read, default: false
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end