class EmployeeNotificationPreferencesWorker
  include Sidekiq::Worker

  def perform(employee_id)
    employee = Employee.find(employee_id)
    
    # Notificar o próprio funcionário, se as preferências permitirem
    if employee.notification_preference.receive_profile_update_notifications?
      Notification.create!(
        title: "#{employee.name} teve alterações no perfil!",
        message: "Os dados pessoais de #{employee.name} foram atualizados.",
        user_id: employee_id,
        notification_type: "GeneralNotification"
      )
    end

    # Notificar administradores, se as preferências permitirem
    admin_users = User.where(role: 'admin')
    admin_users.each do |admin|
      if admin.notification_preference.receive_profile_update_notifications?
        Notification.create!(
          title: "#{employee.name} teve alterações no perfil!",
          message: "Os dados pessoais de #{employee.name} foram atualizados.",
          user_id: admin.id,
          notification_type: "GeneralNotification"
        )
      end
    end
  end
end
