class ChangeDurationToHms < ActiveRecord::Migration[5.1]
  def change
    rename_column :workouts, :duration, :hours
    add_column :workouts, :mins, :integer, null: false
    add_column :workouts, :secs, :integer, null: false
  end
end
