class CreateEmployees < ActiveRecord::Migration[5.1]
  def change
    create_table :employees do |t|
      t.string :name
      t.string :registration
      t.date :birthday
      t.string :municipality
      t.string :state
      t.references :gender, null: true, foreign_key: true
      t.references :marital_state, null: true, foreign_key: true

      t.timestamps
    end
  end
end
