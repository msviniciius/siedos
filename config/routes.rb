Rails.application.routes.draw do
  scope '/v1', defaults: { format: 'json' } do
    # ROUTES EMPLOYEES
    post '/funcionarios',    to: 'v1/employee/base#read'
    get '/funcionarios/:id', to: 'v1/employee/base#show'
    post '/funcionarios/new', to: 'v1/employee/base#create'
    delete '/funcionarios/:id', to: 'v1/employee/base#destroy'
    put '/funcionarios/:id', to: 'v1/employee/base#update'

    get '/job-roles',    to: 'v1/basic_info/base#job_roles'
    get '/work-location',    to: 'v1/basic_info/base#work_location'
    get '/genders',    to: 'v1/basic_info/base#genders'
    get '/states',    to: 'v1/basic_info/base#states'
  end
end
