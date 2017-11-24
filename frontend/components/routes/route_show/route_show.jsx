import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

const mapOptions = {
  center: {
    lat: 37.773972,
    lng: -122.431297
  }, // San Francisco coords
  zoom: 13
};

class RouteShow extends React.Component {
  componentDidMount() {
    this.props.requestRoute(this.props.routeId)
      .then(() => this.renderPolyline());
  }

  renderPolyline() {
    this.map = new google.maps.Map(this.refs.map, mapOptions);
    const savedPath = this.decodePolyline();
    savedPath.setMap(this.map);
  }

  decodePolyline() {
    const polyline = this.props.route.polyline;
    const path = google.maps.geometry.encoding.decodePath(polyline);
    return new google.maps.Polyline({
      path,
      strokeWeight: 4,
      strokeColor: 'blue'
    });
  }

  render() {
    // console.log(this.props);
    const { route } = this.props;
    if (Object.keys(route).length === 0)
      return (<h1>LOADING...</h1>);
    else
      return ( 
        <div>
          <h1>SHOW</h1>
          <div className="map" ref="map">
            Map
          </div>
        </div>
      );
  }
}

export default RouteShow;