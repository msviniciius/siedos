module V1
  module Employee
    class EmployeeListPresenter < V1::BasePresenter
      def initialize(object)
        @object = object[0]
        @total = object[0].length
      end

      def as_json(*)
        return unless @object
        {
          count: @total,
          items: @object.map { |obj| V1::Employee::EmployeeItemPresenter.new(obj) }
        }
      end
    end
  end
end
