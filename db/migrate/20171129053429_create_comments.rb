class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.text :body, null: false
      t.integer :commenter_id, null: false
      t.integer :workout_id, null: false

      t.timestamps
    end

    add_index :comments, :commenter_id
    add_index :comments, :workout_id
  end
end
