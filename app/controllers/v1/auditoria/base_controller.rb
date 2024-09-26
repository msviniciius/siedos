module V1
  module Auditoria
    class BaseController < ApplicationController
      skip_before_action :verify_authenticity_token, if: :json_request?

      # GET /auditorias
      def auditorias
        employee_versions = ::Employee.all.flat_map(&:versions)
        user_versions = ::User.all.flat_map(&:versions)
        all_versions = (employee_versions + user_versions).sort_by(&:created_at)
        
        @presenter = V1::Auditoria::AuditoriaListPresenter.new(all_versions)
        render json: @presenter.as_json
      end

      private

      def json_request?
        request.format.json?
      end
    end
  end
end
