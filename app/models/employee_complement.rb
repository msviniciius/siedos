class EmployeeComplement < ApplicationRecord
  belongs_to :employee

  validates :work_location, presence: true
  validates :position, presence: true
end
