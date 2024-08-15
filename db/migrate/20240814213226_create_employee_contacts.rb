class CreateEmployeeContacts < ActiveRecord::Migration[5.1]
  def change
    create_table :employee_contacts do |t|
      t.references :employee, null: false, foreign_key: true
      t.string :phone
      t.string :cell_phone
      t.string :email

      t.timestamps
    end

    add_index :employee_contacts, :phone, unique: true
    add_index :employee_contacts, :cell_phone, unique: true
    add_index :employee_contacts, :email, unique: true
  end
end
