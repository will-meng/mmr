json.extract! user, :id, :fname, :lname, :img_url
json.img_url (user.img_url && asset_path(user.img_url)) || 
              asset_path(user.image.url(:original))