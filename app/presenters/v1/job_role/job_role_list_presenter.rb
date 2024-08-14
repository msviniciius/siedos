module V1
  module JobRole
    class JobRoleListPresenter < V1::BasePresenter
      def initialize(object)
        @object = object
      end

      def as_json(*)
        return unless @object
        {
          items: @object.map { |obj| V1::JobRole::JobRoleItemPresenter.new(obj) }
        }
      end
    end
  end
end
