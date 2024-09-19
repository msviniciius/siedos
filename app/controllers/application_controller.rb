class ApplicationController < ActionController::Base
  # before_action :authenticate_user!
  protect_from_forgery with: :exception

  SECRET_KEY = Rails.application.credentials.secret_key_base

  def authenticate_user!
    auth_header = request.headers['Authorization']
    if auth_header.present?
      token = auth_header.split(' ').last
      
      decoded_token = JWT.decode(token, Rails.application.credentials.secret_key_base, true, { algorithm: 'HS256' }).first

      @current_user = User.find_by(id: decoded_token['user_id'])
      
      if @current_user.nil?
        render json: { error: 'Usuário não encontrado' }, status: :unauthorized
      end
    else
      render json: { error: 'Token não encontrado' }, status: :unauthorized
    end
  rescue JWT::DecodeError, JWT::VerificationError => e
    render json: { error: 'Token inválido' }, status: :unauthorized
  end
  

  def current_user
    @current_user
  end
end
