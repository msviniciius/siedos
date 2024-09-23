module V1
  module Preference
    class BaseController < ApplicationController
      skip_before_action :verify_authenticity_token

      def read
        query = ::NotificationPreference.where(user_id: params[:base][:id])
        
        presenter = V1::NotificationPreference::NotificationPreferenceListPresenter.new(query)
        render json: presenter.as_json
      end

      def update
        response = ::V1::NotificationPreference::BaseService.instance.update(params)

        render json: response, status: 200
      rescue => e
        debugger
        CustomLog.error(e)
        render json: { error: e.message }, status: :bad_request
      end
    end
  end
end
