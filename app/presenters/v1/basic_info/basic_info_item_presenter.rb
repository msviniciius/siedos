module V1
  module BasicInfo
    class BasicInfoItemPresenter < V1::BasePresenter
      def initialize(object)
        @object = object
      end

      def as_json(*)
        return unless @object
        {
          id: @object.id,
          name: @object.title,
        }
      end
    end
  end
end