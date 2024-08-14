module V1
  class BasePresenter
    attr_reader :success_message, :error_message

    def initialize(status_code: nil, success_message: nil, error_message: nil)
      @status_code = status_code || :ok
      @success_message = success_message if success_message
      @error_message = error_message if error_message
    end

    def success!(message, status = :ok)
      @success_message = message
      @error_message = nil
      @status_code = status
    end

    def error!(message, status = :forbidden)
      @success_message = nil
      @error_message = message
      @status_code = status
    end

    def to_h
      data = as_json(except: "status_code")
      data["success_message"] = @success_message if @success_message
      data["error_message"] = @error_message if @error_message
      {json: data, status: @status_code}
    end
  end
end
