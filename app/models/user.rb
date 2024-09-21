class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :email, presence: true, uniqueness: true

  has_many :notifications, dependent: :destroy

  enum role: { admin: 0, rh: 1, employee: 2 }

  def admin?
    role == 'admin'
  end

  def rh?
    role == 'rh'
  end

  def employee?
    role == 'employee'
  end
end
