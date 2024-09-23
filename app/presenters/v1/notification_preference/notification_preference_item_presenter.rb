module V1
  module NotificationPreference
    class NotificationPreferenceItemPresenter < V1::BasePresenter
      def initialize(object)
        @object = object
      end

      def as_json(*)
        return unless @object
        {
          id: @object.id,
          receive_general_notifications: @object.receive_general_notifications,
          receive_document_notifications: @object.receive_document_notifications,
          receive_profile_update_notifications: @object.receive_profile_update_notifications,
          receive_annivesary_notifications: @object.receive_annivesary_notifications
        }
      end
    end
  end
end