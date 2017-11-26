export const fetchRoutes = () => (
  $.ajax({
    url: 'api/routes',
    method: 'GET'
  })
);

export const fetchRoute = routeId => (
  $.ajax({
    url: `api/routes/${routeId}`,
    method: 'GET'
  })
);

export const createRoute = route => (
  $.ajax({
    url: 'api/routes',
    method: 'POST',
    data: { route }
  })
);

export const updateRoute = route => (
  $.ajax({
    url: `api/routes/${route.id}`,
    method: 'PATCH',
    data: { route }
  })
);

export const deleteRoute = routeId => (
  $.ajax({
    url: `api/routes/${routeId}`,
    method: 'DELETE'
  })
);

export const formatDate = route => {
  const date = new Date(route.created_at);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return month + '/' + day + '/' + year;
};

export const polylineOptions = {
  strokeWeight: 5,
  strokeColor: "blue",
  strokeOpacity: 0.5,
  clickable: false,
};

export const decodeWaypoints = encodedPath => {
  // path is an array of LatLng objects
  const path = google.maps.geometry.encoding.decodePath(encodedPath);
  const waypointsObj = {};
  let i = 0;
  path.forEach(latLng => {
    waypointsObj[++i] = { id: i, latLng };
  });
  return waypointsObj;
};