module V1
  module Employee
    class FullPresenter < V1::BasePresenter
      def initialize(object)
        @object = object
      end

      def as_json(*)
        return unless @object.is_a?(::Employee)
        {
          id: @object.id,
          name: @object.name,
          registration: @object.registration,
          birthday: @object.birthday,
          municipality: @object.municipality,
          state: @object.state,
          marital_status: @object.marital_status,
          gender: @object.gender,
          position: @object.employee_complement.position,
          work_location: @object.employee_complement.work_location,
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
