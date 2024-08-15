class CreateEmployeeDocuments < ActiveRecord::Migration[5.2]
  def change
    create_table :employee_documents do |t|
      t.references :employee, foreign_key: true
      t.timestamps
    end
  end
end
