class ChangeWaypoints < ActiveRecord::Migration[5.1]
  def change
    remove_column :routes, :hstore
    remove_column :routes, :waypoints
    add_column :routes, :waypoints, :float, array: true, default: []
  end
end
