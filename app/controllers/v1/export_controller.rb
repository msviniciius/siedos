module V1
  class ExportController < ApplicationController
    def export_pdf
      filters = load_filters(params)
      
      query = V1::Employee::EmployeeQuery.new(filters)
      service = ::V1::Export::BaseService.instance.export_pdf(query.fetch)
      
      send_data service, filename: 'employees.pdf', type: 'application/pdf', disposition: 'inline'
    rescue => e
      CustomLog.error(e)
      render json: { error: e.message }, status: :bad_request
    end
    
    def export_xls
      filters = load_filters(params)
      
      query = V1::Employee::EmployeeQuery.new(filters)
      service = ::V1::Export::BaseService.instance.export_xls(query.fetch)
      
      send_data service, filename: 'employees.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', disposition: 'inline'
    rescue => e
      CustomLog.error(e)
      render json: { error: e.message }, status: :bad_request
    end
    
    private
  
    def load_filters(params)
      filters = {}
  
      filters[:gender_identity] = params[:gender_identity] if params[:gender_identity].present?
      filters[:job_roles] = params[:job_roles] if params[:job_roles].present?
      filters[:work_locations] = params[:work_locations] if params[:work_locations].present?
      filters[:open_search] = params[:open_search] if params[:open_search].present?
      filters
    end
  end
end