class CustomLog
  class << self
    def debug(obj, register_incident = false)
      print_log(:debug, obj, register_incident)
    end

    def info(obj, register_incident = false)
      print_log(:info, obj, register_incident)
    end

    def warn(obj, register_incident = false)
      print_log(:warn, obj, register_incident)
    end

    def error(obj, register_incident = false)
      print_log(:error, obj.backtrace.join("\n"), register_incident) && return if obj.respond_to?(:backtrace)
      print_log(:error, obj, register_incident)
    end

    def fatal(obj, register_incident = false)
      print_log(:fatal, obj.backtrace.join("\n"), register_incident) && return if obj.respond_to?(:backtrace)
      print_log(:fatal, obj, register_incident)
    end

    private

    def print_log(log_level, obj, register_incident = false)
      caller_info = caller_locations(2, 1)[0]
      clazz = caller_info.path.split("/").last
      method = caller_info.label

      Sentry.capture_exception("#{clazz}:#{method} | #{obj}") if register_incident
      Rails.logger.send(log_level, "#{clazz}:#{method} | #{obj}")
    end
  end
end
