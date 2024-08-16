require 'prawn'

module V1
  module Export
    class BaseService
      include Singleton

      def export_pdf(employees)
        if employees.empty?
          return Prawn::Document.new { |pdf| pdf.text "Nenhum dado informado", size: 30, style: :bold }.render
        end
        
        Prawn::Document.new(page_size: 'A4', page_layout: :landscape) do |pdf|
          pdf.text "Funcionários:", size: 20, style: :bold
          
          pdf.move_down 10 
          
          export_date = Time.now.strftime('%d-%m-%Y %H:%M:%S')
          item_count = employees.size
          
          pdf.text "Data de exportação: #{export_date} | Total Funcionários: #{item_count}", size: 12, style: :italic
          
          pdf.move_down 20
          table_data = [['ID', 'Name', 'Cód. Matricula', 'Data de aniversário', 'Municipio', 'Estado', 'Cargo', 'Alocação']]
          
          employees[0].each do |employee|
            table_data << [
              employee.id,
              employee.name,
              employee.registration,
              employee.birthday.strftime('%d-%m-%Y'),
              employee.municipality,
              employee.state,
              employee.employee_complement.workspace.title,
              employee.employee_complement.job_role.title
            ]
          end
          
          pdf.table(table_data, header: true, row_colors: ['dddddd', 'ffffff']) do
            row(0).font_style = :bold
            cells.padding = 8
            cells.borders = [:bottom]
          end
        end.render
      end     
      
      def export_xls(employees)
        package = Axlsx::Package.new
        workbook = package.workbook
      
        if employees.empty?
          workbook.add_worksheet(name: "Employees") do |sheet|
            sheet.add_row ["Nenhum dado informado"], style: workbook.styles.add_style(b: true, sz: 20)
          end
        else
          workbook.add_worksheet(name: "Employees") do |sheet|
            sheet.add_row ["ID", "Name", "Cód. Matricula", "Data de aniversário", "Municipio", "Estado", "Cargo", "Alocação"], style: workbook.styles.add_style(b: true)
      
            employees[0].each do |employee|
              sheet.add_row [
                employee.id,
                employee.name,
                employee.registration,
                employee.birthday.strftime('%d-%m-%Y'),
                employee.municipality,
                employee.state,
                employee.employee_complement.workspace.title,
                employee.employee_complement.job_role.title
              ]
            end
          end
        end
        package.to_stream.read
      end
      
    end
  end
end
  