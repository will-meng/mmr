class RemoveGenderFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :gender
    change_column :users, :img_url, :string, null: true
  end
end
