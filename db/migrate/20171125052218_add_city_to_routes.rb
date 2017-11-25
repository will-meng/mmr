class AddCityToRoutes < ActiveRecord::Migration[5.1]
  def change
    add_column :routes, :city, :string, default: 'San Francisco, CA'
  end
end
