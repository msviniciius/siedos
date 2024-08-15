class EmployeeContact < ApplicationRecord
  belongs_to :employee

  validates :phone, uniqueness: { scope: :employee_id }
  validates :cell_phone, uniqueness: { scope: :employee_id }
  validates :email, uniqueness: { scope: :employee_id }
end
