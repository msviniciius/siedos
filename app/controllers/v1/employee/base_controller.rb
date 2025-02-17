module V1
  module Employee
    class BaseController < ApplicationController
      skip_before_action :verify_authenticity_token, if: :json_request?

      # GET /employees
      def read
        query = ::Employee.ransack(params[:q])
        employees = query.result.paginate(page: params[:page], per_page: params[:per_page])

        presenter = V1::Employee::EmployeeListPresenter.new(employees)
        render json: presenter.as_json
      end

      def show 
        response = ::Employee.find_by(id: params[:id])
        PaperTrail.request(whodunnit: params[:id], reason: "Funcionário visualizado.")

        presenter = ::V1::Employee::FullPresenter.new(response)
        render presenter.to_h
      end

      # POST /employee
      def create
        employee = ::Employee.create(employee_params)
        PaperTrail.request(whodunnit: employee.id, reason: "Novo funcionário cadastrado.")

        if employee.persisted?
          render json: employee, status: :created
        else
          render json: { errors: employee.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /employee/1
      def update
        response = ::V1::Employee::BaseService.instance.update(params)
        PaperTrail.request(whodunnit: params[:id], reason: "Funcionário alterado.")

        render json: response, status: 200
      rescue => e
        CustomLog.error(e)
        render json: { error: e.message }, status: :bad_request
      end

      # DELETE /employee/1
      def destroy
        response = ::V1::Employee::BaseService.instance.delete(params)
        PaperTrail.request(whodunnit: params[:id], reason: "Funcionário deletado.")

        render json: response, status: 200
      rescue => e
        CustomLog.error(e)
        render json: { error: e.message }, status: :bad_request
      end

      private

      def employee_params
        params.require(:employee).permit(
          :name, :registration, :birthday, :municipality, :state,
          :gender_id, :marital_state_id,
          employee_complement_attributes: [:job_role_id, :workspace_id],
          employee_contacts_attributes: [:phone, :cell_phone, :email]
        )
      end

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
