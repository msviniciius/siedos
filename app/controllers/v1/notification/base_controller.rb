module V1
  module Notification
    class BaseController < ApplicationController
      skip_before_action :verify_authenticity_token

      # POST /notifications
      def read
        query = V1::Notification::NotificationQuery.new(params)

        presenter = V1::Notification::NotificationListPresenter.new(query.fetch)
        render json: presenter.as_json
      end

      def update
        response = ::V1::Notification::BaseService.instance.update(params)

        render json: response, status: 200
      rescue => e
        CustomLog.error(e)
        render json: { error: e.message }, status: :bad_request
      end

      def mark_as_read
        notification = Notification.find_by(id: params[:id])
        if notification && notification.update(read: true)
          render json: { success: true, notification: notification }
        else
          render json: { success: false, message: 'Notificação não encontrada ou não pôde ser atualizada.' }, status: :not_found
        end
      end
    end
  end
end
