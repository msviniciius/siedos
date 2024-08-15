module V1
  module Employee
    class FullPresenter < V1::BasePresenter
      def initialize(object)
        @object = object
      end

      def as_json(*)
        return unless @object.is_a?(::Employee)
        {
          id: @object.id,
          name: @object.name,
          registration: @object.registration,
          birthday: @object.birthday,
          municipality: @object.municipality,
          state: @object.state,
          marital_state: @object.marital_state,
          gender: @object.gender,
          job_role: @object.employee_complement.job_role,
          workspace: @object.employee_complement.workspace,
          contacts: @object.employee_contacts,
          document_upload: doc_upload
        }
      end

      def doc_upload
        @object.employee_documents.map do |doc|
          {
            id: doc.id,
            filename: doc.document.filename.to_s,
            content_type: doc.document.content_type,
            byte_size: doc.document.byte_size,
            url: Rails.application.routes.url_helpers.rails_blob_url(doc.document, only_path: true)
          }
        end
      end
    end
  end
end
