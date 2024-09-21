module V1
  module Notification
    class NotificationQuery
      def initialize(params)
        @user_id = params[:user_id]
        @where = []
        @params = {}
        @joins = [:notifications]
        @order = { id: :desc }
        @limit = 200
      end

      attr_writer :limit

      def fetch
        query = ::Notification.where(user_id: 5)
        query = @where.blank? ? query.order(@order) : query.where(@where.join(" AND "), @params).order(@order)
        @limit ? [query.limit(@limit), query.count] : [query, query.count]
      end
    end
  end
end
