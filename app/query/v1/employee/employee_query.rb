module V1
    module Employee
      class EmployeeQuery
        def initialize(params)
          @where = []
          @params = {}
          @order = {id: :desc}
          @limit = 200

          search(params[:open_search]) if params[:open_search].present?
        end
  
        attr_writer :limit
  
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
          query = @where.blank? ? employee.order(@order) : employee.where(@where.join(" AND "), @params).order(@order)
  
          @limit ? [query.limit(@limit), query.count] : [query, query.count]
        end
      end
    end
  end
  