module V1
  module User
    class BaseController < ApplicationController
      skip_before_action :verify_authenticity_token, if: :json_request?

      # GET /users
      def read
        query = V1::User::UserQuery.new()

        presenter = V1::User::UserListPresenter.new(query.fetch)
        render json: presenter.as_json
      end

      def show 
        response = ::User.find_by(id: params[:id])
        PaperTrail.request(whodunnit: params[:id], reason: "Usuário visualizado.")
        
        presenter = ::V1::User::FullPresenter.new(response)
        render presenter.to_h
      end

      # POST /user
      def create
        response = ::V1::User::BaseService.instance.create(params)
        PaperTrail.request(whodunnit: response.id, reason: "Novo usuário cadastrado.")
        
        render json: response, status: 200
      rescue => e
        CustomLog.error(e)
        render json: { error: e.message }, status: :bad_request
      end

      # PATCH/PUT /user/1
      def update
        response = ::V1::User::BaseService.instance.update(params)
        PaperTrail.request(whodunnit: params[:id], reason: "Usuário alterado.")

        render json: response, status: 200
      rescue => e
        CustomLog.error(e)
        render json: { error: e.message }, status: :bad_request
      end

      # DELETE /user/1
      def destroy
        response = ::V1::User::BaseService.instance.delete(params)
        PaperTrail.request(whodunnit: params[:id], reason: "Usuário deletado.")

        render json: response, status: 200
      rescue => e
        CustomLog.error(e)
        render json: { error: e.message }, status: :bad_request
      end

      private

      def json_request?
        request.format.json?
      end
    end
  end
end
