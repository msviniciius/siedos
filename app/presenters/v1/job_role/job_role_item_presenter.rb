module V1
  module JobRole
    class JobRoleItemPresenter < V1::BasePresenter
      def initialize(object)
        @object = object
      end

      def as_json(*)
        return unless @object
        {
          id: @object.id,
          name: @object.title,
        }
      end
    end
  end
end