json.outRequests current_user.unconfirmed_requested_friendships.pluck(:requestee_id)

json.inRequests current_user.unconfirmed_pending_friendships.pluck(:requestor_id)

json.friendIds current_user.confirmed_friends.pluck(:id)