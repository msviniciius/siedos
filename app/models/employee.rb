class Employee < ApplicationRecord
  has_one :employee_complement, dependent: :destroy
  belongs_to :gender
  belongs_to :marital_state

  validates :name, presence: true
  validates :registration, presence: true, uniqueness: true
  validates :birthday, presence: false
  validates :municipality, presence: false
  validates :marital_state_id, required: false, presence: false
  validates :gender_id, required: false, presence: false
end
