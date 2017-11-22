import React from 'react';
// import { withRouter } from 'react-router-dom';

import MarkerManager from '../../utils/marker_manager';

// const getCoordsObj = latLng => ({
//   lat: latLng.lat(),
//   lng: latLng.lng()
// });

// TODO get user's location
const mapOptions = {
  center: {
    lat: 37.773972,
    lng: -122.431297
  }, // San Francisco coords
  zoom: 13
};

class RunMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {waypoints: {}};
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(this.map);
  }

  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
    this.MarkerManager = new MarkerManager(
      this.map, 
      this.handleMarkerClick.bind(this),
      this.handleMarkerDrag.bind(this)
    );
    this.registerListeners();
  }

  registerListeners() {
    google.maps.event.addListener(this.map, 'click', (event) => {
      this.handleClick(event.latLng);
    });
  }
  
  handleClick(latLng) {
    const len = this.waypointIds().length;
    if (len < 23) {
      const lastIdx = parseInt(this.waypointIds()[len - 1]) + 1 || 1;
      const waypoint = { id: lastIdx, latLng };
      this.MarkerManager.createMarker(waypoint);
      
      const waypoints = this.state.waypoints;
      waypoints[lastIdx] = waypoint;
      this.setState({waypoints: waypoints});
    }
  }
  
  handleMarkerClick(waypoint) {
    const waypoints = this.state.waypoints;
    delete waypoints[waypoint.id];
    this.setState({waypoints: waypoints});
  }

  handleMarkerDrag(waypoint) {
    const waypoints = this.state.waypoints;
    waypoints[waypoint.id] = waypoint;
    this.setState({waypoints: waypoints});
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
