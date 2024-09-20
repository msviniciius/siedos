module V1
  module BasicInfo
    class BaseController < ApplicationController
      skip_before_action :verify_authenticity_token, if: :json_request?

      # GET /job-role
      def job_roles
        query = ::JobRole.all.order(title: :asc)

        @presenter = V1::BasicInfo::BasicInfoListPresenter.new(query)
        render json: @presenter.as_json
      end

      # GET /work-location
      def work_location
        query = ::Workspace.all.order(title: :asc)

        @presenter = V1::BasicInfo::BasicInfoListPresenter.new(query)
        render json: @presenter.as_json
      end

      # GET /genders
      def genders
        query = ::Gender.all.order(id: :asc)

        @presenter = V1::BasicInfo::BasicInfoListPresenter.new(query)
        render json: @presenter.as_json
      end

      # GET /states
      def states
        query = ::MaritalState.all.order(id: :asc)

        @presenter = V1::BasicInfo::BasicInfoListPresenter.new(query)
        render json: @presenter.as_json
      end

      def roles
        @presenter = ::User.roles.keys.map { |role| { id: role, name: role.humanize } }
        render json: @presenter.as_json
      end

      private

      def json_request?
        request.format.json?
      end
    end
  end
end
