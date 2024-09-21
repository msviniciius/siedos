module V1
  module Notification
    class NotificationItemPresenter < V1::BasePresenter
      def initialize(object)
        @object = object
      end

      def as_json(*)
        return unless @object
        {
          id: @object.id,
          title: @object.title,
          message: @object.message,
          read: @object.read
        }
      end
    end
  end
end