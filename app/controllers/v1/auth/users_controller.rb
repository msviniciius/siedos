module V1
  module Auth
    class UsersController < ApplicationController
      before_action :authenticate_user!

      # GET /auth/user/infos
      def infos
        if current_user
          @presenter = V1::UserInfo::UserInfoItemPresenter.new(current_user)
          render json: @presenter.to_h
        else
          render json: { error: 'Usuário não autenticado' }, status: :unauthorized
        end
      end
    end
  end
end