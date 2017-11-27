class ChangeWorkoutDistance < ActiveRecord::Migration[5.1]
  def change
    change_column :workouts, :distance, :float
  end
end
