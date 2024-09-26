class ApplicationController < ActionController::Base
  # before_action :authenticate_user!
  protect_from_forgery with: :exception
  before_action :set_paper_trail_whodunnit

  SECRET_KEY = Rails.application.credentials.secret_key_base

  def authenticate_user!
    auth_header = request.headers['Authorization']
    
    if auth_header.present?
      token = auth_header.split(' ').last
  
      begin
        decoded_token = JWT.decode(token, SECRET_KEY, true, { algorithm: 'HS256' }).first
      rescue JWT::DecodeError => e
        return render json: { error: 'Token inválido' }, status: :unauthorized
      end
  
      @current_user = User.find_by(id: decoded_token['user_id'])
  
      if @current_user.nil?
        return render json: { error: 'Usuário não encontrado' }, status: :unauthorized
      end
    else
      return render json: { error: 'Token não encontrado' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end
end
