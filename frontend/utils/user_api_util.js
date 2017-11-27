export const searchUsers = query => (
  $.ajax({
    url: 'api/users',
    method: 'GET',
    data: { query }
  })
);

export const fetchUser = userId => (
  $.ajax({
    url: `api/users/${userId}`,
    method: 'GET'
  })
);

export const updateUser = user => (
  $.ajax({
    url: `api/users/${user.id}`,
    method: 'PATCH',
    data: { user }
  })
);