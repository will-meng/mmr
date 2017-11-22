import React from 'react';
// import { withRouter } from 'react-router-dom';

// import MarkerManager from '../../util/marker_manager';

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
  }
  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
    // this.MarkerManager = new MarkerManager(this.map);
    this.registerListeners();
  }

  registerListeners() {
    google.maps.event.addListener(this.map, 'click', (event) => {
      this.handleClick(event.latLng);
    });
  }

  waypointIds() {
    return Object.keys(this.state.waypoints);
  }

  handleClick(latLng) {
    const len = this.waypointIds().length;
    if (len < 23) {
      console.log(this.waypointIds());
      console.log((this.waypointIds()[len - 1] + 1));
      console.log((this.waypointIds()[len - 1] + 1) || 1);
      const lastIdx = (this.waypointIds()[len - 1] + 1) || 1;
      const newWaypoints = this.state.waypoints;
      newWaypoints[lastIdx] = latLng;
      this.setState({waypoints: newWaypoints});
    }
  }

  render() {
    const waypoints = this.state.waypoints;
    return (
      <div>
        <ul>
          {
          this.waypointIds().map(id => 
              <li key={id}>
                {`Lat ${id}: ${waypoints[id].lat()} 
                  Lng ${id}: ${waypoints[id].lng()}`}
              </li>
            )
          }
        </ul>
        <div className="map" ref="map">
          Map
        </div>
      </div>
    );
  }
}

export default RunMap;
