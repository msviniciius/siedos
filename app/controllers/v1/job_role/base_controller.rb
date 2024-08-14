module V1
  module JobRole
    class BaseController < ApplicationController
      skip_before_action :verify_authenticity_token, if: :json_request?

      # GET /job-role
      def read
        query = ::JobRole.all.order(title: :asc)

        @presenter = V1::JobRole::JobRoleListPresenter.new(query)
        render json: @presenter.as_json
      end

      private

      def json_request?
        request.format.json?
      end
    end
  end
end
