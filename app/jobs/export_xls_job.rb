class ExportXlsJob
    include Sidekiq::Job
  
    def perform(filters)
      begin
        query = V1::Employee::EmployeeQuery.new(filters)
        employees = query.fetch

        xls_data = ::V1::Export::BaseService.instance.export_xls(employees)
    
        File.open("tmp/employees_#{Time.now.to_i}.xlsx", 'wb') do |file|
          file.write(xls_data)
        end
      rescue => e
        CustomLog.error(e)

        ErrorNotificationMailer.send_error_notification(e.message).deliver_now
      end
    end
  end
  