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
          marital_state: @object.marital_state,
          gender: @object.gender,
          job_role: @object.employee_complement.job_role,
          workspace: @object.employee_complement.workspace
        }
      end
    end
  end
end
