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

export const fetchCurrentUser = () => (
  $.ajax({
    url: 'api/session',
    method: 'GET'
  })
);

export const updateUser = (formData, userId) => (
  $.ajax({
    url: `api/users/${userId}`,
    method: 'PATCH',
    processData: false,
    contentType: false,
    dataType: 'json',
    data: formData 
  })
);