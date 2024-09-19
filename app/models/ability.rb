class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    
    if user.admin?
      can :manage, :all
    elsif user.rh?
      can :manage, Employee
    elsif user.employee?
      can :read, Employee, id: user.id
      can :update, Employee, id: user.id
    else
      cannot :manage, :all
    end
  end
end
