class Employee < ApplicationRecord
  has_one :employee_complement, dependent: :destroy
  
  belongs_to :gender
  belongs_to :marital_state

  has_many :employee_contacts, dependent: :destroy
  has_many :employee_documents, dependent: :destroy

  accepts_nested_attributes_for :employee_contacts, allow_destroy: true
  accepts_nested_attributes_for :employee_documents, allow_destroy: true

  validates :name, presence: true
  validates :registration, presence: true, uniqueness: true
  validates :birthday, presence: false
  validates :municipality, presence: false
  validates :marital_state_id, required: false, presence: false
  validates :gender_id, required: false, presence: false
end
