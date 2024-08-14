class EmployeeComplement < ApplicationRecord
  belongs_to :employee
  belongs_to :workspace
  belongs_to :job_role

  validates :workspace_id, presence: true
  validates :job_role_id, uniqueness: { scope: :workspace_id, message: "já está sendo utilizado nesta lotação" }
end
