class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email, null: false, unique: true
      t.string :img_url, null: false
      t.string :fname, null: false
      t.string :lname, null: false
      t.date :birthday, null: false
      t.string :gender, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false, unique: true

      t.timestamps
    end
    add_index :users, :email
    add_index :users, :session_token
  end
end
