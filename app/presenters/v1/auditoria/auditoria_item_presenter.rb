module V1
  module Auditoria
    class AuditoriaItemPresenter < V1::BasePresenter
      def initialize(object)
        @object = object
      end

      def as_json(*)
        return unless @object
        {
          id: @object.id,
          item: format_item_type(@object.item_type),
          event: format_event(@object.event),
          object: parse_object(@object.object),
          date: @object.created_at.to_date,
        }
      end

      private

      def format_item_type(item_type)
        item_type.present? ? item_type.titleize : "Desconhecido"
      end

      def format_event(event)
        case event
          when "create" then "Criação"
          when "update" then "Atualização"
          when "destroy" then "Exclusão"
        end
      end

      def parse_object(object)
        begin
          YAML.safe_load(object) || object
        rescue StandardError
          object
        end
      end
    end
  end
end