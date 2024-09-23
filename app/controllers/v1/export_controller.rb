module V1
  class ExportController < ApplicationController
    # GET /pdf/export_pdf
    def export_pdf
      filters = load_filters(params)

      ExportPdfJob.perform_async(filters)

      render json: { message: 'Exportação iniciada.' }, status: :accepted
    rescue => e
      CustomLog.error(e)
      render json: { error: e.message }, status: :bad_request
    end
    
    # GET /xls/export_xls
    def export_xls
      filters = load_filters(params)

      ExportXlsJob.perform_async(filters)
      
      send_data service, filename: 'employees.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', disposition: 'inline'

      render json: { message: 'Exportação iniciada.' }, status: :accepted
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