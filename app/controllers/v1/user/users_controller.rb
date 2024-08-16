module V1
  module Auth
    class UsersController < V1::BaseController
    # GET /auth/user
      def infos
        if current_user
          @presenter = UserPresenter.new(current_user)
          render @presenter.to_h
        else
          # this is a workaround to provided proper redirect on users
          # that have a cached version of the app and are trying to get
          # user info from the endpoint
          # Please note: this may last for a while until all user have
          # the new version properly installed and using the rails routes

          # Angular requrires a 'responseError' handler and we actually only
          # implement the response (success catcher). Since the app will not
          # reload until the request (in this case, auth one) returns a 200
          # WITH a header containing a different application_version ompared to
          # the cached one in the user page (meta-tag: hub:application_version)

          # this will send the application_version and force the app to reload
          # doind this, will load the updated code that will handle the
          # redirects to the external pages.
          render json: {}, status: 200
        end
      end
    end
  end
end