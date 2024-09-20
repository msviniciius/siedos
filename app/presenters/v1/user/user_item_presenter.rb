module V1
  module User
    class UserItemPresenter < V1::BasePresenter
      def initialize(object)
        @object = object
      end

      def as_json(*)
        return unless @object
        {
          id: @object.id,
          email: @object.email,
          role: @object.role
        }
      end
    end
  end
end