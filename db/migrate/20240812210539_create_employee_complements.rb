class CreateEmployeeComplements < ActiveRecord::Migration[5.1]
  def change
    create_table :employee_complements do |t|
      t.references :employee, foreign_key: true
      t.string :work_location
      t.string :position

      t.timestamps
    end
  end
end
