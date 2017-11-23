class ChangeDistanceToFloat < ActiveRecord::Migration[5.1]
  def change
    change_column :routes, :distance, :float
  end
end
