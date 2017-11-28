class CreateFriendships < ActiveRecord::Migration[5.1]
  def change
    create_table :friendships do |t|
      t.integer :requestor_id, null: false
      t.integer :requestee_id, null: false
      t.boolean :confirmed, default: false
      t.timestamps
    end

    add_index :friendships, [:requestor_id, :requestee_id], unique: true
    add_index :friendships, :requestee_id
  end
end
