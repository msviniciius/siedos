module V1
    module Employee
      class EmployeeQuery
        def initialize(params)
          @where = []
          @params = {}
          @joins = []
          @order = {id: :desc}
          @limit = 200
          
          gender_identity(params[:gender_identity]) if params[:gender_identity].present?
          job_roles(params[:job_roles]) if params[:job_roles].present?
          work_locations(params[:work_locations]) if params[:work_locations].present?
          search(params[:open_search]) if params[:open_search].present?
        end
  
        attr_writer :limit

        def gender_identity(value)
          return if value.blank? || value.include?('0')
          
          @where << "employees.gender_id IN (:gender_identity)"
          @params[:gender_identity] = value
        end

        def job_roles(value)
          return if value.blank?

          @joins << "JOIN employee_complements ON employee_complements.employee_id = employees.id"
          @where << "employee_complements.job_role_id IN (:job_role)"
          @params[:job_role] = value
        end

        def work_locations(value)
          return if value.blank?

          @joins << "JOIN employee_complements ON employee_complements.employee_id = employees.id"
          @where << "employee_complements.workspace_id IN (:workspace)"
          @params[:workspace] = value
        end
  
        def search(value)
          return if value.nil?
          where_str = "(LOWER(employees.name) like :name_search OR LOWER(employees.registration) like :name_search"
          @params[:name_search] = "%#{value.downcase}%"
  
          if value.to_i > 0
            where_str = "#{where_str} OR employees.id = :id_search"
            @params[:id_search] = value.to_i
          end
  
          where_str = "#{where_str})"
          @where << where_str
        end
  
        def fetch
          employee = ::Employee

          query = @joins.blank? ? employee : employee.joins(@joins.join(" "))
          query = @where.blank? ? query.order(@order) : query.where(@where.join(" AND "), @params).order(@order)
          @limit ? [query.limit(@limit), query.count] : [query, query.count]
        end
      end
    end
  end
  