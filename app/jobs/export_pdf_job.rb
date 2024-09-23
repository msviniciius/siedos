class ExportPdfJob
  include Sidekiq::Job

  def perform(filters)
    begin
      query = V1::Employee::EmployeeQuery.new(filters)
      employees = query.fetch

      pdf_data = ::V1::Export::BaseService.instance.export_pdf(employees)

      file_path = "tmp/employees_#{Time.now.to_i}.pdf"
      File.open(file_path, 'wb') do |file|
        file.write(pdf_data)
      end
    rescue => e
      CustomLog.error(e)

      ErrorNotificationMailer.send_error_notification(e.message).deliver_now
    end
  end
end
