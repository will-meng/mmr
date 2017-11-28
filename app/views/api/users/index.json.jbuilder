json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! 'user', user: user
    end
  end
end

json.currentUser do
  json.searchResultIds @users.pluck(:id)
end