import React from 'react';
import MarkerManager from '../../../utils/marker_manager';
import RouteForm from './route_form';
import RouteOverlay from './route_overlay';
import { withRouter } from 'react-router-dom';
import { decodeWaypoints, polylineOptions } from '../../../utils/route_api_util';
import LoadingModal from '../../loading/loading_modal';

// TODO get user's location
const mapOptions = {
  center: {
    lat: 37.773972,
    lng: -122.431297
  }, // San Francisco coords
  zoom: 13,
  draggableCursor: 'crosshair'
};

const _directionsRendererOptions = {
  draggable: false,
  preserveViewport: true,
  suppressMarkers: true,
  polylineOptions
};

const btnURL = 'https://d3o6qfi6hwcdhb.cloudfront.net/309c1e1337e4/img/sprite-primary.png';

class RouteCreate extends React.Component {
  // waypointsObj shape: { 1: { id: 1, latLng: latLngObj } }
  constructor(props) {
    super(props);
    this.state = {
      waypointsObj: {},
      name: '',
      description: '',
      distance: 0
    };
    this.maxWaypoints = 20;
    this.markerIdx = 0;
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer(_directionsRendererOptions);
  }

  componentWillMount() {
    this.props.removeErrors();
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, mapOptions);
    this.service = new google.maps.places.PlacesService(this.map);
    this.directionsDisplay.setMap(this.map);
    this.MarkerManager = new MarkerManager(
      this.map, 
      this.removeWaypoint.bind(this), // click handler
      this.modifyWaypoint.bind(this) // drag-end handler
    );
    this.registerListeners();
    if (this.props.formType === 'edit') 
      this.props.requestRoute(this.props.routeId)
        .then(this.checkUser.bind(this))
        .then(this.loadSavedMap.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formType !== nextProps.formType)
      if (nextProps.formType === 'new') {
        this.setState({ name: '', description: '' });
        this.resetMap();
      } else {
        nextProps.requestRoute(nextProps.routeId)
          .then(this.checkUser.bind(this))
          .then(this.loadSavedMap.bind(this));
      }
  }

  checkUser() {
    if (this.props.route.creator_id !== this.props.currentUser.id)
      this.props.history.push(`/`);
  }

  loadSavedMap() {
    const { name, description, distance, city } = this.props.route;
    const waypointsObj = decodeWaypoints(this.props.route.waypoints);
    this.setState({ waypointsObj, name, description, distance });
    this.city = city;
    this.markerIdx = this._waypointIds().length;
    this.MarkerManager.createAllMarkers(waypointsObj);
    this.recenterMap();
    this.calculateAndRenderRoute(this.directionsService, this.directionsDisplay);
  }

  resetMap() {
    this.MarkerManager.removeMarkers();
    this.directionsDisplay.setDirections({routes: []});
    this.markerIdx = 0;
    this.city = null;
    this.setState({
      waypointsObj: {},
      distance: 0
    });
  }

  registerListeners() {
    google.maps.event.addListener(this.map, 'click', (event) => {
      this.handleClick(event.latLng);
    });
  }
  
  handleClick(latLng) {
    const waypoint = { id: ++this.markerIdx, latLng };
    const len = this._waypointIds().length;
    if (len === 0) {
      this.MarkerManager.createMarker(waypoint);
      this.setState({waypointsObj: { [waypoint.id]: waypoint }});
    } else if (len < this.maxWaypoints) {
      const waypoints = this.state.waypointsObj;
      waypoints[this.markerIdx] = waypoint;
      this.calculateAndRenderRoute(this.directionsService, this.directionsDisplay, true);
    } else {
      alert(`Maximum of ${this.maxWaypoints} waypoints allowed`);
    }
  }

  calculateAndRenderRoute(directionsService, directionsDisplay, addEndpoint = false) {
    const waypoints = [];
    let origin, destination, wypt;
    this._waypointsArr().forEach((waypoint, i) => {
      if (i === 0) 
        origin = waypoint.latLng;
      else if (i === this._waypointsArr().length - 1)
        destination = waypoint.latLng;
      else
        waypoints.push({ location: waypoint.latLng, stopover: true });
    });
      
    directionsService.route({
      origin,
      destination,
      waypoints,
      optimizeWaypoints: false,
      travelMode: 'WALKING'
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        if (!this.city)
          this.getCity(response.geocoded_waypoints[0].place_id);
        const resRoute = response.routes[0];
        if (addEndpoint)
          this.addEndpoint(resRoute);
        else
          this.calculateAndSetDistance(resRoute);
      }
    });
  }

  addEndpoint(route) {
    const endLatLng = route.legs[route.legs.length - 1].end_location;
    const waypoint = { id: this.markerIdx, latLng: endLatLng };
    this.MarkerManager.createMarker(waypoint);
    this.calculateAndSetDistance(route);
    this.addWaypointToState(waypoint);
  }

  calculateAndSetDistance(route) {
    const distance = route.legs.reduce((sum, leg) => sum + leg.distance.value, 0);
    const distanceMiles = Math.round(distance / 1609.34 * 100) / 100;
    this.setState({distance: distanceMiles});
  }

  getCity(placeId) {
    this.service.getDetails({placeId}, res => {
      let city, state;
      res.address_components.forEach(component => {
        if (component.types[0] === 'locality')
          city = component.long_name;
        if (component.types[0] === 'administrative_area_level_1')
          state = component.short_name;
      });
      this.city = city + ', ' + state;
    });
  }
  
  removeWaypoint(waypoint) {
    const waypoints = this.state.waypointsObj;
    delete waypoints[waypoint.id];
    if (this._waypointIds().length < 2) {
      this.city = null;
      this.directionsDisplay.setDirections({routes: []}); //clear polylines
    } else {
      this.calculateAndRenderRoute(this.directionsService, this.directionsDisplay);
    }
    this.setState({waypointsObj: waypoints});
  }

  modifyWaypoint(waypoint) {
    this.addWaypointToState(waypoint, true);
  }

  addWaypointToState(waypoint, recalculate = false) {
    const waypoints = this.state.waypointsObj;
    waypoints[waypoint.id] = waypoint;
    if (recalculate)
      this.calculateAndRenderRoute(this.directionsService, this.directionsDisplay);
    this.setState({ waypoints });
  }

  undoLastWaypoint() {
    const waypoints = this._waypointsArr();
    if (waypoints.length > 0) {
      const lastWaypoint = waypoints[waypoints.length - 1];
      this.MarkerManager.removeMarkerFromWaypoint(lastWaypoint);
      this.removeWaypoint(lastWaypoint);
    }
  }

  recenterMap() {
    if (this._waypointIds().length > 0) {
      this.calculateBounds();
      this.map.fitBounds(this.bounds);
    }
  }

  calculateBounds() {
    this.bounds = new google.maps.LatLngBounds();
    this._waypointsArr().forEach(wyptObj => this.bounds.extend(wyptObj.latLng));
  }

  returnToOrigin() {
    const waypoints = this._waypointsArr();
    if (waypoints.length > 0) {
      this.handleClick(waypoints[0].latLng);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this._waypointsArr().length > 1) {
      const routeParams = this.createRouteParams();
      this.props.submitAction(routeParams)
        .then(action => this.props.history.push(`/route/${action.route.id}`));
    } else {
      alert('You must have at least two points on the map to save a route.');
    }
  }

  createRouteParams() {
    const { name, description, distance } = this.state;
    const routeParams = { name, description, distance };
    routeParams.polyline = this.encodePolyline();
    routeParams.waypoints = this.encodePathFromWaypoints();
    this.calculateBounds();
    routeParams.bounds = JSON.stringify(this.bounds);
    routeParams.city = this.city;
    if (this.props.routeId)
      routeParams.id = this.props.routeId;
    return routeParams;
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
  }

  encodePolyline() {
    const directions = this.directionsDisplay.getDirections();
    return directions.routes[0].overview_polyline;
  }

  encodePathFromWaypoints() {
    const path = this._waypointsArr().map(wypt => wypt.latLng);
    return google.maps.geometry.encoding.encodePath(path);
  }

  _waypointsArr() {
    return Object.values(this.state.waypointsObj);
  }

  _waypointIds() {
    return Object.keys(this.state.waypointsObj);
  }
  
  render() {
    const { errors, removeErrors, loading } = this.props;
    const { name, description } = this.state;
    const waypoints = this.state.waypointsObj;

    return (
      <div className='route-main'>
        <RouteForm 
          name={this.state.name}
          description={this.state.description}
          handleSubmit={this.handleSubmit.bind(this)}
          update={this.update.bind(this)}
          errors={this.props.errors}
        />

        <div className='map-container'>
            <RouteOverlay
              resetMap={this.resetMap.bind(this)}
              undoLastWaypoint={this.undoLastWaypoint.bind(this)}
              recenterMap={this.recenterMap.bind(this)}
              returnToOrigin={this.returnToOrigin.bind(this)}
              distance={this.state.distance}
            />
          <div className="map" ref="map"></div>
        </div>

        {loading ? <LoadingModal/> : null }
      </div>
    );
  }
}

export default withRouter(RouteCreate);
