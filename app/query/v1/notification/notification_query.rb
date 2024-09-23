module V1
  module Notification
    class NotificationQuery
      def initialize(params)
        @user_id = params[:params] 
        @preferences = ::NotificationPreference.find_by(user_id: @user_id)
        @where = []
        @params = {}
        @order = { id: :desc }
        @limit = 200
      end

      attr_writer :limit

      def fetch
        query = ::Notification.where(user_id: @user_id)
        apply_preferences_filter(query)

        query = @where.blank? ? query.order(@order) : query.where(@where.join(" AND "), @params).order(@order)
        
        @limit ? [query.limit(@limit), query.count] : [query, query.count]
      end

      private

      def apply_preferences_filter(query)
        return unless @preferences
      
        allowed_types = []
      
        allowed_types << "AnniversaryNotification" if @preferences.receive_annivesary_notifications
        allowed_types << "ProfileUpdateNotification" if @preferences.receive_profile_update_notifications
        allowed_types << "DocumentNotification" if @preferences.receive_document_notifications
        allowed_types << "GeneralNotification" if @preferences.receive_general_notifications
      
        query.where!(notification_type: allowed_types) unless allowed_types.empty?
      end
    end
  end
end
