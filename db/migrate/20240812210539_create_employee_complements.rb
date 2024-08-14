class CreateEmployeeComplements < ActiveRecord::Migration[5.1]
  def change
    create_table :employee_complements do |t|
      t.references :employee, foreign_key: true
      t.references :job_role, null: false, foreign_key: true
      t.references :workspace, null: false, foreign_key: true

      t.timestamps
    end
  end
end
