module V1
  module Auditoria
    class AuditoriaListPresenter < V1::BasePresenter
      def initialize(object)
        @object = object
      end

      def as_json(*)
        return unless @object
        {
          items: @object.map { |obj| V1::Auditoria::AuditoriaItemPresenter.new(obj) }
        }
      end
    end
  end
end
