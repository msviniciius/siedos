class EmployeeComplement < ApplicationRecord
  belongs_to :employee
  belongs_to :workspace
  belongs_to :job_role

  validates :workspace_id, presence: true
  validates :job_role_id, presence: true
end
