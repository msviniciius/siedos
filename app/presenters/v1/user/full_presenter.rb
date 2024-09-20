module V1
  module User
    class FullPresenter < V1::BasePresenter
      def initialize(object)
        @object = object
      end

      def as_json(*)
        return unless @object.is_a?(::User)
        {
          id: @object.id,
          email: @object.email,
          role: @object.role
        }
      end
    end
  end
end
