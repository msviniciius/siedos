module V1
  module Employee
    class EmployeeItemPresenter < V1::BasePresenter
      def initialize(object)
        @object = object
      end

      def as_json(*)
        return unless @object
        {
          id: @object.id,
          name: @object.name,
          registration: @object.registration,
          birthday: @object.birthday,
          municipality: @object.municipality,
          gender: @object.gender,
          job_role: @object.employee_complement.job_role,
          workspace: @object.employee_complement.workspace
        }
      end
    end
  end
end