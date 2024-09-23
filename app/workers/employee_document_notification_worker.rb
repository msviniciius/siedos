class EmployeeDocumentNotificationWorker
  include Sidekiq::Worker

  def perform(employee_id, document_name)
    employee = Employee.find(employee_id)
    
    # Envia notificação para o próprio funcionário
    Notification.create!(
      title: "Novo documento!",
      message: "O documento '#{document_name}' foi adicionado ao seu perfil.",
      user_id: employee_id,
      notification_type: "DocumentNotification"
    )

    # Envia notificação para todos os administradores
    admin_users = User.where(role: 'admin')
    admin_users.each do |admin|
      Notification.create!(
        title: "Novo documento!",
        message: "O documento '#{document_name}' foi adicionado ao perfil de #{employee.name}.",
        user_id: admin.id,
        notification_type: "DocumentNotification"
      )
    end
  end
end
