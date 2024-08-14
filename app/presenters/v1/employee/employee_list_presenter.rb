module V1
  module Employee
    class EmployeeListPresenter < V1::BasePresenter
      def initialize(object)
        @object = object[0]
        # @total_pages = object.total_pages
      end

      def as_json(*)
        return unless @object
        {
          count: 1,
          total_pages: 2,
          items: @object.map { |obj| V1::Employee::EmployeeItemPresenter.new(obj) }
        }
      end
    end
  end
end
