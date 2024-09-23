module V1
  module NotificationPreference
    class NotificationPreferenceListPresenter < V1::BasePresenter
      def initialize(object)
        @object = object
      end

      def as_json(*)
        return unless @object
        {
          items: @object.map { |obj| V1::NotificationPreference::NotificationPreferenceItemPresenter.new(obj) }
        }
      end
    end
  end
end
