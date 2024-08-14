class CreateEmployees < ActiveRecord::Migration[5.1]
  def change
    create_table :employees do |t|
      t.string :name
      t.string :registration
      t.date :birthday
      t.string :municipality
      t.string :state
      t.string :gender
      t.string :marital_status

      t.timestamps
    end
  end
end
