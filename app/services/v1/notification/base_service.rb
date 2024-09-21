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
    end
  end
end
  