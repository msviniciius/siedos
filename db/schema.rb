# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2024_09_26_120357) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "employee_complements", force: :cascade do |t|
    t.bigint "employee_id"
    t.bigint "job_role_id", null: false
    t.bigint "workspace_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_employee_complements_on_employee_id"
    t.index ["job_role_id", "workspace_id"], name: "index_unique_job_role_workspace", unique: true
    t.index ["job_role_id"], name: "index_employee_complements_on_job_role_id"
    t.index ["workspace_id"], name: "index_employee_complements_on_workspace_id"
  end

  create_table "employee_contacts", force: :cascade do |t|
    t.bigint "employee_id", null: false
    t.string "phone"
    t.string "cell_phone"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cell_phone"], name: "index_employee_contacts_on_cell_phone", unique: true
    t.index ["email"], name: "index_employee_contacts_on_email", unique: true
    t.index ["employee_id"], name: "index_employee_contacts_on_employee_id"
    t.index ["phone"], name: "index_employee_contacts_on_phone", unique: true
  end

  create_table "employee_documents", force: :cascade do |t|
    t.bigint "employee_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_employee_documents_on_employee_id"
  end

  create_table "employees", force: :cascade do |t|
    t.string "name"
    t.string "registration"
    t.date "birthday"
    t.string "municipality"
    t.string "state"
    t.bigint "gender_id"
    t.bigint "marital_state_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["gender_id"], name: "index_employees_on_gender_id"
    t.index ["marital_state_id"], name: "index_employees_on_marital_state_id"
  end

  create_table "genders", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "job_roles", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "marital_states", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "user_id"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "notification_preferences", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.boolean "receive_profile_update_notifications", default: true
    t.boolean "receive_document_notifications", default: true
    t.boolean "receive_general_notifications", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "receive_annivesary_notifications"
    t.index ["user_id"], name: "index_notification_preferences_on_user_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.string "title", null: false
    t.text "message"
    t.boolean "read", default: false
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "notification_type"
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "role"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "versions", force: :cascade do |t|
    t.string "item_type", null: false
    t.bigint "item_id", null: false
    t.string "event", null: false
    t.string "whodunnit"
    t.text "object"
    t.datetime "created_at"
    t.index ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id"
  end

  create_table "workspaces", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "employee_complements", "employees"
  add_foreign_key "employee_complements", "job_roles"
  add_foreign_key "employee_complements", "workspaces"
  add_foreign_key "employee_contacts", "employees"
  add_foreign_key "employee_documents", "employees"
  add_foreign_key "employees", "genders"
  add_foreign_key "employees", "marital_states"
  add_foreign_key "messages", "users"
  add_foreign_key "notification_preferences", "users"
  add_foreign_key "notifications", "users"
end
