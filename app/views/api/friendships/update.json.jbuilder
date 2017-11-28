json.friendIds current_user.confirmed_friends.pluck(:id)

json.inRequests current_user.unconfirmed_pending_friendships.pluck(:requestor_id)