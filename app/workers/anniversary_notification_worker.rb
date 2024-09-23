class AnniversaryNotificationWorker
  include Sidekiq::Worker

  def perform
    today = Date.today

    Employee.where("EXTRACT(MONTH FROM birthday) = ? AND EXTRACT(DAY FROM birthday) = ?", today.month, today.day).find_each do |employee|
      Notification.create!(
        title: "Feliz Aniversário, #{employee.name}!",
        message: "Hoje é o seu aniversário! Parabéns!",
        user_id: employee.id,
        notification_type: "AnniversaryNotification"
      )
    end
  end
end
