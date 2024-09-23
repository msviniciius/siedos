module V1
  module Notification
    class BaseService
      include Singleton

      def update(params)
        notification = ::Notification.find(params[:id])
        
        ActiveRecord::Base.transaction do
          notification.update!(
            read: params[:notification][:read]
          )
        end

        notification
      end

      def send_global(params)
        GlobalNotificationWorker.perform_async(params[:title], params[:message])
        :ok
      end
    end
  end
end
  