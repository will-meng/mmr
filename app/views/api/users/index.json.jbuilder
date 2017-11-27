json.users do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :fname, :lname, :img_url
    end
  end
end

json.currentUser do
  json.searchResultIds @users.pluck(:id)
end