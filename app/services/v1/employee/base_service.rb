module V1
  module Employee
    class BaseService
      include Singleton

      # create required path
      def create(params)
        employee = ::Employee.create(
          name: params[:name],
          registration: params[:registration],
          birthday: params[:birthday],
          municipality: params[:municipality],
          state: params[:state],
          marital_status: params[:marital_status],
          gender: params[:gender]
        )

        # Cria o EmployeeComplement associado ao Empoyee
        ::EmployeeComplement.create(
          employee_id: employee.id, 
          work_location: params[:work_location],
          position: params[:position]
        )

        employee
      end

      def update(params)
        employee = ::Employee.find(params[:id])

        employee.update!(
          name: params[:name],
          registration: params[:registration],
          birthday: params[:birthday],
          municipality: params[:municipality],
          state: params[:state],
          marital_status: params[:marital_status],
          gender: params[:gender]
        )

        employee.employee_complement.update!(
          work_location: params[:work_location],
          position: params[:position]
        )

        employee
      end

      def delete(params)
        employee = ::Employee.find(params[:id])

        if employee.employee_complement
          ActiveRecord::Base.transaction do
            employee.employee_complement.destroy
            employee.destroy!
          end
          { success: true, message: 'Funcionário e dados complementares excluídos com sucesso' }
        else
          employee.destroy
          { success: true, message: 'Funcionário excluído com sucesso' }
        end
      rescue StandardError => e
        { success: false, error: e.message }
      end
    end
  end
end
  