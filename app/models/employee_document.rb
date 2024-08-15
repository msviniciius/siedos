class EmployeeDocument < ApplicationRecord
  belongs_to :employee
  has_one_attached :document
end