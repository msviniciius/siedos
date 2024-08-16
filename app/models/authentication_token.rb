class AuthenticationToken < ApplicationRecord
  belongs_to :user

  validates :user, presence: true, uniqueness: true
  validates :token, presence: true
end
