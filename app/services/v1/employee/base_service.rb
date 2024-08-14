module V1
  module Employee
    class BaseService
      include Singleton

      def create(params)
        ActiveRecord::Base.transaction do
          employee = ::Employee.create!(
            name: params[:name],
            registration: params[:registration],
            birthday: params[:birthday],
            municipality: params[:municipality],
            state: params[:state],
            gender_id: params[:gender_id],
            marital_state_id: params[:marital_state_id]
          )

          employee_complement = ::EmployeeComplement.create!(
            employee_id: employee.id, 
            workspace_id: params[:workspace_id],
            job_role_id: params[:job_role_id]
          )

          unless employee_complement.persisted?
            raise ActiveRecord::Rollback, 'Failed create EmployeeComplement'
          end

          employee
        end
      end

      def update(params)
        employee = ::Employee.find(params[:id])

        employee.update!(
          name: params[:name],
          registration: params[:registration],
          birthday: params[:birthday],
          municipality: params[:municipality],
          state: params[:state],
          gender_id: params[:gender_id],
          marital_state_id: params[:marital_state_id]
        )

        employee.employee_complement.update!(
          workspace_id: params[:workspace_id],
          job_role_id: params[:job_role_id]
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
  