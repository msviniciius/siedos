module V1
  module Authentication
    class BaseService
      include Singleton

      def register_user(params)
        if ::User.exists?(email: params[:email])
          { success: false, message: "Email já cadastrado" }
        else
          user = ::User.create(
            email: params[:email],
            password: Base64.decode64(params[:password]),
            password_confirmation: Base64.decode64(params[:password_confirmation])
          )

          if user.persisted?
            { success: true, message: "Cadastro realizado com sucesso" }
          else
            { success: false, message: "Erro ao criar usuário" }
          end
        end
      end

      def login_user(params)
        result = find_user_and_decode_password(params)
  
        if result[:success]
          { success: true, message: "Usuário logado com sucesso", user: result[:user] }
        else
          { success: false, message: "Credenciais inválidas" }
        end
      rescue => e
        CustomLog.error("Erro ao autenticar usuário: #{e}")
        { success: false, message: e.message }
      end

      def find_user_and_decode_password(params)
        begin
          user = ::User.find_by!("lower(email) = ?", params[:email].downcase)
          password = Base64.decode64(params[:password])
          
          { success: user.valid_password?(password), user: user }
        rescue ActiveRecord::RecordNotFound
          { success: false, user: nil }
        end
      end
    end
  end
end