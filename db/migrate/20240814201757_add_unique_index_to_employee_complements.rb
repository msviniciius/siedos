class AddUniqueIndexToEmployeeComplements < ActiveRecord::Migration[5.1]
  def change
    add_index :employee_complements, [:job_role_id, :workspace_id], unique: true, name: 'index_unique_job_role_workspace'
  end
end
