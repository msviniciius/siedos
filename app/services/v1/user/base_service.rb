module V1
  module User
    class BaseService
      include Singleton

      def update(params)
        user = ::User.find(params[:id])
        
        ActiveRecord::Base.transaction do
          user.update!(
            role: params[:role],
          )
        end

        user
      end

      def delete(params)
        user = ::User.find_by(id: params[:id])
      
        if user
          user.destroy!
          { success: true, message: 'Funcionário excluído com sucesso' }
        else
          { success: false, message: 'Funcionário não encontrado' }
        end
      rescue => e
        { success: false, message: "Erro ao excluir funcionário: #{e.message}" }
      end
    end
  end
end
  