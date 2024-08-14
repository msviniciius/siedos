module V1
  module BasicInfo
    class BasicInfoListPresenter < V1::BasePresenter
      def initialize(object)
        @object = object
      end

      def as_json(*)
        return unless @object
        {
          items: @object.map { |obj| V1::BasicInfo::BasicInfoItemPresenter.new(obj) }
        }
      end
    end
  end
end
