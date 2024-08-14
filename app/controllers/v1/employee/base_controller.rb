module V1
  module Employee
    class BaseController < ApplicationController
      skip_before_action :verify_authenticity_token, if: :json_request?

      # GET /employees
      def read
        filters = load_filters(params)
        query = V1::Employee::EmployeeQuery.new(filters)  # Use o nome absoluto do modelo

        presenter = V1::Employee::EmployeeListPresenter.new(query.fetch)
        render json: presenter.as_json
      end

      def show 
        response = ::Employee.find_by(id: params[:id])
        
        presenter = ::V1::Employee::FullPresenter.new(response)
        render presenter.to_h
      end

      # POST /employee
      def create
        response = ::V1::Employee::BaseService.instance.create(params)
        
        render json: response, status: 200
      rescue => e
        CustomLog.error(e)
        render json: { error: e.message }, status: :bad_request
      end

      # PATCH/PUT /employee/1
      def update
        response = ::V1::Employee::BaseService.instance.update(params)

        render json: response, status: 200
      rescue => e
        debugger
        CustomLog.error(e)
        render json: { error: e.message }, status: :bad_request
      end

      # DELETE /employee/1
      def destroy
        response = ::V1::Employee::BaseService.instance.delete(params)

        render json: response, status: 200
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

      def json_request?
        request.format.json?
      end
    end
  end
end
