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

ActiveRecord::Schema.define(version: 20171130201604) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "comments", force: :cascade do |t|
    t.text "body", null: false
    t.integer "commenter_id", null: false
    t.integer "workout_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commenter_id"], name: "index_comments_on_commenter_id"
    t.index ["workout_id"], name: "index_comments_on_workout_id"
  end

  create_table "friendships", force: :cascade do |t|
    t.integer "requestor_id", null: false
    t.integer "requestee_id", null: false
    t.boolean "confirmed", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["requestee_id"], name: "index_friendships_on_requestee_id"
    t.index ["requestor_id", "requestee_id"], name: "index_friendships_on_requestor_id_and_requestee_id", unique: true
  end

  create_table "routes", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.integer "creator_id", null: false
    t.float "distance", null: false
    t.string "polyline", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "waypoints", null: false
    t.string "bounds", null: false
    t.string "city", default: "San Francisco, CA"
    t.index ["creator_id"], name: "index_routes_on_creator_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "img_url"
    t.string "fname", null: false
    t.string "lname", null: false
    t.date "birthday", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.index ["email"], name: "index_users_on_email"
    t.index ["session_token"], name: "index_users_on_session_token"
  end

  create_table "workouts", force: :cascade do |t|
    t.string "name", null: false
    t.integer "user_id", null: false
    t.date "date", null: false
    t.text "description"
    t.integer "route_id", null: false
    t.integer "hours", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "distance", null: false
    t.integer "mins", null: false
    t.integer "secs", null: false
    t.index ["user_id"], name: "index_workouts_on_user_id"
  end

end
