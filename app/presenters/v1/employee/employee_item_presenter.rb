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
          employee_complement: employee_complement
        }
      end

      private

      def employee_complement
        return unless @object.employee_complement
        employee_complement = @object.employee_complement

        {
          id: employee_complement.id,
          work_location: employee_complement.work_location,
          position: employee_complement.position
        }
      end
    end
  end
end