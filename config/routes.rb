require 'sidekiq/web'

Rails.application.routes.draw do
  devise_for :users
  
  scope '/v1', defaults: { format: 'json' } do
    mount Sidekiq::Web => '/sidekiq'
    mount ActionCable.server => '/cable'

    # ROUTES EMPLOYEES
    post '/funcionarios',       to: 'v1/employee/base#read'
    get '/funcionarios/:id',    to: 'v1/employee/base#show'
    post '/funcionarios/new',   to: 'v1/employee/base#create'
    delete '/funcionarios/:id', to: 'v1/employee/base#destroy'
    put '/funcionarios/:id',    to: 'v1/employee/base#update'    
    
    # ROUTES USERS
    post '/users',              to: 'v1/user/base#read'
    get '/users/:id',           to: 'v1/user/base#show'
    post '/users/new',          to: 'v1/user/base#create'
    delete '/users/:id',        to: 'v1/user/base#destroy'
    put '/users/:id',           to: 'v1/user/base#update'

    # ROUTES BASIC
    get '/job-roles',           to: 'v1/basic_info/base#job_roles'
    get '/work-location',       to: 'v1/basic_info/base#work_location'
    get '/genders',             to: 'v1/basic_info/base#genders'
    get '/states',              to: 'v1/basic_info/base#states'
    get '/roles',               to: 'v1/basic_info/base#roles'

    # ROUTES EXPORT
    get 'pdf/export_pdf',       to: 'v1/export#export_pdf'
    get 'xls/export_xls',       to: 'v1/export#export_xls'

    # AUTHENTICATION ROUTES
    post '/user/register',        to: 'v1/user_authentication/base#register'
    post '/user/login',           to: 'v1/user_authentication/base#login'
    post '/user/check-email',     to: 'v1/user_authentication/base#check_email'

    get '/auth/user/infos',      to: 'v1/auth/users#infos'

    post '/notification/:id',   to: 'v1/notification/base#update'
    get  '/notifications',       to: 'v1/notification/base#read'
    post '/mark_as_read',        to: 'v1/notification/base#mark_as_read'
  end
end
