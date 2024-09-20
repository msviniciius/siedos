module V1
    module User
      class UserQuery
        def initialize()
          @where = []
          @params = {}
          @joins = []
          @order = {id: :desc}
          @limit = 200
        end
  
        attr_writer :limit
  
        def fetch
          user = ::User

          query = @joins.blank? ? user : user.joins(@joins.join(" "))
          query = @where.blank? ? query.order(@order) : query.where(@where.join(" AND "), @params).order(@order)
          @limit ? [query.limit(@limit), query.count] : [query, query.count]
        end
      end
    end
  end
  