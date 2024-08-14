class Employee < ApplicationRecord
  has_one :employee_complement, dependent: :destroy
  accepts_nested_attributes_for :employee_complement

  validates :name, presence: true
  validates :registration, presence: true, uniqueness: true
  validates :birthday, presence: false
  validates :municipality, presence: false
  validates :state, presence: false
  validates :marital_status, presence: false
  validates :gender, presence: false

  enum gender: { male: 'Homem', female: 'Mulher' }
  enum marital_status: { single: 'Solteiro', married: 'Casado', divorced: 'Divorciado' }
end
