class CreateApiRoutes < ActiveRecord::Migration[5.1]
  def change
    create_table :routes do |t|
      t.string :name, null: false
      t.text :description
      t.integer :creator_id, null: false
      t.integer :distance, null: false
      t.float :waypoints, :hstore, null: false
      t.string :polyline, null: false
      t.timestamps
    end

    add_index :routes, :creator_id
  end
end
