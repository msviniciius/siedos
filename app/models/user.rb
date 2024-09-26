class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_paper_trail

  validates :email, presence: true, uniqueness: true

  has_many :notifications, dependent: :destroy
  has_one :notification_preference, dependent: :destroy
  after_create :build_default_notification_preference

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

  private

  def build_default_notification_preference
    create_notification_preference
  end
end
