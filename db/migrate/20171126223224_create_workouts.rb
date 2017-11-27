class CreateWorkouts < ActiveRecord::Migration[5.1]
  def change
    create_table :workouts do |t|
      t.string :name, null: false
      t.integer :user_id, null: false
      t.date :date, null: false
      t.text :description
      t.integer :route_id, null: false
      t.integer :duration, null: false

      t.timestamps
    end

    add_index :workouts, :user_id
  end
end
