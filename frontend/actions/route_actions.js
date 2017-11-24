import * as RouteAPIUtils from '../utils/route_api_util';

export const RECEIVE_ROUTES = 'RECEIVE_ROUTES';
export const RECEIVE_ROUTE = 'RECEIVE_ROUTE';
export const REMOVE_ROUTE = 'REMOVE_ROUTE';
export const RECEIVE_ROUTE_ERRORS = 'RECEIVE_ROUTE_ERRORS';

const receiveRoutes = routes => ({
  type: RECEIVE_ROUTES,
  routes
});

const receiveRoute = route => ({
  type: RECEIVE_ROUTE,
  route
});

const removeRoute = routeId => ({
  type: REMOVE_ROUTE,
  routeId
});

const receiveRouteErrors = errors => ({
  type: RECEIVE_ROUTE_ERRORS,
  errors
});

export const requestRoutes = () => dispatch => (
  RouteAPIUtils.fetchRoutes()
    .then(routes => dispatch(receiveRoutes(routes)))
);

export const requestRoute = routeId => dispatch => (
  RouteAPIUtils.fetchRoute(routeId)
    .then(route => dispatch(receiveRoute(route)), console.log)
      
);

export const createRoute = routeForm => dispatch => (
  RouteAPIUtils.createRoute(routeForm)
    .then(route => dispatch(receiveRoute(route)),
      errors => dispatch(receiveRouteErrors(errors.responseJSON)))
);

export const updateRoute = routeForm => dispatch => (
  RouteAPIUtils.updateRoute(routeForm)
    .then(route => dispatch(receiveRoute(route)),
      errors => dispatch(receiveRouteErrors(errors.responseJSON)))
);

export const deleteRoute = routeId => dispatch => (
  RouteAPIUtils.deleteRoute(routeId)
    .then(route => dispatch(removeRoute(route.id)))
);