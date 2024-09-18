module V1
  module Authentication
    class BaseService
      include Singleton

      AUTH_TOKEN_DURATION = 24.hours.from_now.to_i
      SECRET_KEY = Rails.application.secrets.secret_key_base

      def register_user(params)
        if ::User.exists?(email: params[:email])
          { success: false, message: "Email já cadastrado" }
        else
          password = safe_decode_password(params[:password])
          password_confirmation = safe_decode_password(params[:password_confirmation])

          if password.nil? || password_confirmation.nil?
            return { success: false, message: "Senha inválida" }
          end

          user = ::User.create(
            email: params[:email],
            password: password,
            password_confirmation: password_confirmation
          )

          if user.persisted?
            { success: true, message: "Cadastro realizado com sucesso" }
          else
            { success: false, message: user.errors.full_messages.join(", ") }
          end
        end
      end

      def login_user(params)
        result = find_user_and_decode_password(params)

        if result[:success]
          token = generate_token(result[:user])
          { success: true, message: "Usuário logado com sucesso", token: token, user: result[:user] }
        else
          { success: false, message: "Credenciais inválidas" }
        end
      rescue => e
        CustomLog.error("Erro ao autenticar usuário: #{e}")
        { success: false, message: e.message }
      end

      def generate_token(user)
        payload = {
          user_id: user.id,
          email: user.email,
          exp: AUTH_TOKEN_DURATION.to_i
        }

        JWT.encode(payload, SECRET_KEY)
      end

      def find_user_and_decode_password(params)
        begin
          user = ::User.find_by!("lower(email) = ?", params[:email].downcase)
          password = safe_decode_password(params[:password])

          if password.nil?
            { success: false, user: nil }
          else
            { success: user.valid_password?(password), user: user }
          end
        rescue ActiveRecord::RecordNotFound
          { success: false, user: nil }
        end
      end

      def safe_decode_password(password)
        Base64.decode64(password)
      rescue ArgumentError
        nil
      end
    end
  end
end