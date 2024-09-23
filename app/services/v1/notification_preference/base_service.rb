module V1
  module NotificationPreference
    class BaseService
      include Singleton

      def update(params)
        notification_preference = ::NotificationPreference.find_by(user_id: params[:id])
        
        ActiveRecord::Base.transaction do
          if notification_preference
            notification_preference.update!(
              receive_profile_update_notifications: params[:receive_profile_update_notifications],
              receive_document_notifications: params[:receive_document_notifications],
              receive_general_notifications: params[:receive_general_notifications],
              receive_annivesary_notifications: params[:receive_annivesary_notifications]
            )
          else
            notification_preference = ::NotificationPreference.create!(
              user_id: params[:id],
              receive_profile_update_notifications: params[:receive_profile_update_notifications],
              receive_document_notifications: params[:receive_document_notifications],
              receive_general_notifications: params[:receive_general_notifications],
              receive_annivesary_notifications: params[:receive_annivesary_notifications]
            )
          end
        end

        notification_preference
      end
    end
  end
end
  