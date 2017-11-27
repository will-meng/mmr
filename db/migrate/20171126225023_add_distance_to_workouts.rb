class AddDistanceToWorkouts < ActiveRecord::Migration[5.1]
  def change
    add_column :workouts, :distance, :integer, null: false
  end
end
