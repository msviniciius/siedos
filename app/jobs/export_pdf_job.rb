class ExportPdfJob
    include Sidekiq::Job
  
    def perform(filters)
      query = V1::Employee::EmployeeQuery.new(filters)
      employees = query.fetch
      pdf_data = ::V1::Export::BaseService.instance.export_pdf(employees)
  
      File.open("tmp/employees_#{Time.now.to_i}.pdf", 'wb') do |file|
        file.write(pdf_data)
      end
    end
  end
  