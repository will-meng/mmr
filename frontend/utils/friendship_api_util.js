export const fetchFriends = () => (
  $.ajax({
    url: 'api/friendships',
    method: 'GET'
  })
);

export const requestFriendship = requesteeId => (
  $.ajax({
    url: 'api/friendships',
    method: 'POST',
    data: { requesteeId }
  })
);

export const confirmFriendship = requestorId => (
  $.ajax({
    url: `api/friendships/${requestorId}`,
    method: 'PATCH'
  })
);

export const deleteFriendship = userId => (
  $.ajax({
    url: `api/friendships/${userId}`,
    method: 'DELETE'
  })
);

