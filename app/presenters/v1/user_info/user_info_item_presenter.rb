module V1
  module UserInfo
    class UserInfoItemPresenter < V1::BasePresenter
      def initialize(object)
        @object = object
      end

      def to_h
        return unless @object
        {
          id: @object.id,
          name: @object.email
        }
      end
    end
  end
end