class ChangeRoutes < ActiveRecord::Migration[5.1]
  def change
    remove_column :routes, :waypoints
    add_column :routes, :waypoints, :string, null: false
    add_column :routes, :bounds, :string, null: false
  end
end
