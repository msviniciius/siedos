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

ActiveRecord::Schema.define(version: 20240814201757) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "employee_complements", force: :cascade do |t|
    t.bigint "employee_id"
    t.bigint "job_role_id"
    t.bigint "workspace_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_employee_complements_on_employee_id"
    t.index ["job_role_id", "workspace_id"], name: "index_unique_job_role_workspace", unique: true
    t.index ["job_role_id"], name: "index_employee_complements_on_job_role_id"
    t.index ["workspace_id"], name: "index_employee_complements_on_workspace_id"
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

  create_table "workspaces", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "employee_complements", "job_roles"
  add_foreign_key "employee_complements", "workspaces"
  add_foreign_key "employees", "genders"
  add_foreign_key "employees", "marital_states"
end
