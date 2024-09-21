module V1
  module Notification
    class NotificationListPresenter < V1::BasePresenter
      def initialize(object)
        @object = object[0]
        @total = object[0].length
      end

      def as_json(*)
        return unless @object
        {
          count: @total,
          items: @object.map { |obj| V1::Notification::NotificationItemPresenter.new(obj) }
        }
      end
    end
  end
end
