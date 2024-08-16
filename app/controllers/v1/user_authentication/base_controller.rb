module V1
  module UserAuthentication
    class BaseController < ApplicationController
      skip_before_action :verify_authenticity_token, if: :json_request?
      AUTH_TOKEN_DURATION = 24.hours.from_now.to_i

      # POST /user/register
      def register
        response = ::V1::Authentication::BaseService.instance.register_user(params)
        
        if response[:success]
          render json: { message: "Cadastro realizado com sucesso" }, status: :ok
        else
          render json: { message: response[:message] }, status: :bad_request
        end
      rescue => e
        CustomLog.error("User #{params["email"]} not saved. Error #{e}")
        render json: { error: e.message }, status: :internal_server_error
      end

      # POST /user/login
      def login
        response = ::V1::Authentication::BaseService.instance.login_user(params)
        
        if response[:success]
          render json: { token: response[:token], message: "Login realizado com sucesso" }, status: :ok
        else
          render json: { error: response[:message] }, status: :unauthorized
        end
      rescue => e
        CustomLog.error("Falha no login do usuário #{params[:email]}. Error: #{e}")
        render json: { error: "Erro ao realizar login" }, status: :bad_request
      end

      # GET /user/check-email
      def check_email
        email_valid = ::User.exists?(email: params[:email])

        render json: { exists: email_valid }, status: :ok
      end
      private

      def json_request?
        request.format.json?
      end
    end
  end
end
