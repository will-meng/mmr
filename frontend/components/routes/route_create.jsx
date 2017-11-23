import React from 'react';
import MarkerManager from '../../utils/marker_manager';
import RouteForm from './route_form';
import RouteOverlay from './route_overlay';

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
  polylineOptions: {
    strokeWeight: 4,
    strokeColor: "blue"
  }
};

const btnURL = 'https://d3o6qfi6hwcdhb.cloudfront.net/309c1e1337e4/img/sprite-primary.png';

class RouteCreate extends React.Component {
  // waypoints shape: { 1: { id: 1, latLng: latLngObj } }
  constructor(props) {
    super(props);
    this.state = {
      waypoints: {},
      name: '',
      description: '',
      distance: 0
    };
    this.maxWaypoints = 20;
    this.markerIdx = 0;
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer(_directionsRendererOptions);
    this.bounds  = new google.maps.LatLngBounds();
  }

  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
    this.directionsDisplay.setMap(this.map);
    this.MarkerManager = new MarkerManager(
      this.map, 
      this.removeWaypoint.bind(this),
      this.modifyWaypoint.bind(this)
    );
    this.registerListeners();
  }

  resetMap() {
    this.MarkerManager.removeMarkers();
    this.directionsDisplay.setDirections({routes: []});
    this.markerIdx = 0;
    this.setState({
      waypoints: {},
      name: '',
      description: '',
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
      this.bounds.extend(latLng); //for map re-centering
      this.setState({waypoints: { [waypoint.id]: waypoint }});
    } else if (len < this.maxWaypoints) {
      const waypoints = this.state.waypoints;
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
        const route = response.routes[0];
        if (addEndpoint)
          this.addEndpoint(route);
        else
          this.calculateAndSetDistance(route);
      }
    });
  }

  addEndpoint(route) {
    const endLatLng = route.legs[route.legs.length - 1].end_location;
    this.bounds.extend(endLatLng); //for map re-centering
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
  
  removeWaypoint(waypoint) {
    const waypoints = this.state.waypoints;
    delete waypoints[waypoint.id];
    if (this._waypointIds().length < 2)
      this.directionsDisplay.setDirections({routes: []}); //clear polylines
    else
      this.calculateAndRenderRoute(this.directionsService, this.directionsDisplay);
    this.setState({waypoints: waypoints});
  }

  modifyWaypoint(waypoint) {
    this.addWaypointToState(waypoint, true);
  }

  addWaypointToState(waypoint, recalculate = false) {
    const waypoints = this.state.waypoints;
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
    this.map.fitBounds(this.bounds);
    // this.map.panToBounds(this.bounds); 
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
      const directions = this.directionsDisplay.getDirections();
      this.state.polyline = directions.routes[0].overview_polyline;
      this.state.waypoints = this.createWaypointsArray();
      this.props.createRoute(this.state);
    } else {
      alert('You must have at least two points on the map to save a route.');
    }
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
  }

  createWaypointsArray() {
    const arr = [];
    this._waypointsArr().map(wypt => arr.push(wypt.latLng.lat(), wypt.latLng.lng()));
    return arr;
  }

  _waypointsArr() {
    return Object.values(this.state.waypoints);
  }

  _waypointIds() {
    return Object.keys(this.state.waypoints);
  }
  
  render() {
    const waypoints = this.state.waypoints;
    return (
      <div className='route-main'>
        <RouteForm 
          name={this.state.name}
          description={this.state.description}
          handleSubmit={this.handleSubmit.bind(this)}
          update={this.update.bind(this)}
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
      </div>
    );
  }
}

export default RouteCreate;
