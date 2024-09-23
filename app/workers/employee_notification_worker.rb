class EmployeeNotificationWorker
  include Sidekiq::Worker

  def perform(employee_id)
    employee = Employee.find(employee_id)
    
    # Envia notificação para o próprio funcionário
    Notification.create!(
      title: "Atualização no seu perfil!",
      message: "Seus dados pessoais foram atualizados.",
      user_id: employee_id,
      notification_type: "ProfileUpdateNotification"
    )

    # Envia notificação para todos os administradores
    admin_users = User.where(role: 'admin')
    admin_users.each do |admin|
      Notification.create!(
        title: "Alterações no perfil!",
        message: "Os dados pessoais de #{employee.name} foram atualizados.",
        user_id: admin.id,
        notification_type: "ProfileUpdateNotification"
      )
    end
  end
end

