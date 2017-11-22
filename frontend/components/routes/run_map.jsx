import React from 'react';
// import { withRouter } from 'react-router-dom';

import MarkerManager from '../../utils/marker_manager';

const getCoordsObj = latLng => ({
  lat: latLng.lat(),
  lng: latLng.lng()
});

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

class RunMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waypoints: {},
      title: '',
      description: '',
      distance: 0
    };
    this.markerIdx = 0;
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer(_directionsRendererOptions);
  }

  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
    this.directionsDisplay.setMap(this.map);
    this.MarkerManager = new MarkerManager(
      this.map, 
      this.handleMarkerClick.bind(this),
      this.modifyWaypoint.bind(this)
    );
    this.registerListeners();
  }

  registerListeners() {
    google.maps.event.addListener(this.map, 'click', (event) => {
      this.handleClick(event.latLng);
    });
  }
  
  handleClick(latLng) {
    const waypoint = { id: ++this.markerIdx, latLng };
    const len = this.waypointIds().length;
    if (len === 0) {
      this.MarkerManager.createMarker(waypoint);
      this.setState({waypoints: { [waypoint.id]: waypoint }});
    } else if (len < 23) {
      const waypoints = this.state.waypoints;
      waypoints[this.markerIdx] = waypoint;
      this.calculateRoute(this.directionsService, this.directionsDisplay, true);
    } else {
      alert("Maximum of 23 waypoints allowed");
    }
  }

  calculateRoute(directionsService, directionsDisplay, addEndpoint = false) {
    const waypoints = [];
    let origin, destination, wypt;
    Object.values(this.state.waypoints).forEach((waypoint, i) => {
      wypt = { location: waypoint.latLng, stopover: true };

      if (i === 0) 
        origin = waypoint.latLng;
      else if (i === Object.values(this.state.waypoints).length - 1)
        destination = waypoint.latLng;
      else
        waypoints.push(wypt);
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
        if (addEndpoint)
          this.parseResponse(response);
      } else {
        console.log('failed to get route');
      }
    });
  }

  parseResponse(response) {
    const route = response.routes[0];
    const endLatLng = route.legs[route.legs.length - 1].end_location;
    const waypoint = { id: this.markerIdx, latLng: endLatLng };
    this.MarkerManager.createMarker(waypoint);
    this.addWaypointToState(waypoint);
  }
  
  handleMarkerClick(waypoint) {
    const waypoints = this.state.waypoints;
    delete waypoints[waypoint.id];
    if (this.waypointIds().length < 2)
      this.directionsDisplay = 
        new google.maps.DirectionsRenderer(_directionsRendererOptions);
    else
      this.calculateRoute(this.directionsService, this.directionsDisplay);
    this.setState({waypoints: waypoints});
  }

  addWaypointToState(waypoint) {
    const waypoints = this.state.waypoints;
    waypoints[waypoint.id] = waypoint;
    this.setState({ waypoints });
  }

  modifyWaypoint(waypoint) {
    const waypoints = this.state.waypoints;
    waypoints[waypoint.id] = waypoint;
    this.calculateRoute(this.directionsService, this.directionsDisplay);
    this.setState({ waypoints });
  }

  waypointIds() {
    return Object.keys(this.state.waypoints);
  }
  
  render() {
    const waypoints = this.state.waypoints;
    return (
      <div>
        <div className="map" ref="map">
          Map
        </div>

        {/* TESTING output lat/lng */}
        <ul>
          {
          this.waypointIds().map(id => 
              <li key={id}>
                {`Lat ${id}: ${waypoints[id].latLng.lat()} 
                  Lng ${id}: ${waypoints[id].latLng.lng()}`}
              </li>
            )
          }
        </ul>
        {/* TESTING end */}

      </div>
    );
  }
}

export default RunMap;
