json.users do
  current_user.all_friends.each do |friend|
    json.set! friend.id do
      json.partial! 'api/users/user', user: friend
    end
  end
end

json.currentUser do
  json.searchResultIds []
  json.outRequests current_user.unconfirmed_requested_friendships.pluck(:requestee_id)
  json.inRequests current_user.unconfirmed_pending_friendships.pluck(:requestor_id)
  json.friendIds current_user.confirmed_friends.pluck(:id)
end