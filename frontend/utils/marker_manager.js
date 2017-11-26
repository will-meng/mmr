const startImage = {
  url: 'https://d3o6qfi6hwcdhb.cloudfront.net/309c1e1337e4/img/sprite-primary.png',
  size: new google.maps.Size(26, 32),
  origin: new google.maps.Point(0, 268),
};

const endImage = {
  url: 'https://d3o6qfi6hwcdhb.cloudfront.net/309c1e1337e4/img/sprite-primary.png',
  size: new google.maps.Size(26, 32),
  origin: new google.maps.Point(0, 302),
};

const midImage = {
  url: 'https://d3o6qfi6hwcdhb.cloudfront.net/309c1e1337e4/img/sprite-primary.png',
  size: new google.maps.Size(16, 16),
  origin: new google.maps.Point(0, 560),
  anchor: new google.maps.Point(8, 8),
};

const _nullMarker = new google.maps.Marker({
  // no map specified means not visible
  position: { lat: 37.773972,lng: -122.431297 } 
});

class MarkerManager {
  constructor(map, handleClick, handleDrag){
    this.map = map;
    this.handleClick = handleClick;
    this.handleDrag = handleDrag;
    this.markers = {};
  }

  createMarker(waypoint) {
    const marker = new google.maps.Marker({
      position: waypoint.latLng,
      map: this.map,
      id: waypoint.id,
      draggable: true,
      // label: 'Marker ' + waypoint.id
    });
    
    this._lastMarker().setIcon(midImage);

    marker.addListener('click', () => {
      this.removeMarker(marker);
      return this.handleClick(waypoint);
    });

    marker.addListener('dragend', () => {
      waypoint.latLng = marker.position;
      return this.handleDrag(waypoint);
    });

    this.markers[marker.id] = marker;
    this.setMarkerEndpointIcons();
  }

  createShowMarker(waypoint) {
    const marker = new google.maps.Marker({
      position: waypoint.latLng,
      map: this.map,
      id: waypoint.id,
      draggable: false,
      clickable: false,
    });

    this._lastMarker().setIcon(midImage);
    this.markers[marker.id] = marker;
    this.setMarkerEndpointIcons();
  }

  createAllMarkers(waypointsObj, showMode = false) {
    Object.values(waypointsObj).forEach(waypoint => {
      if (showMode)
        this.createShowMarker(waypoint);
      else
        this.createMarker(waypoint);
    });
  }

  removeMarker(marker) {
    this.markers[marker.id].setMap(null);
    delete this.markers[marker.id];
    this.setMarkerEndpointIcons();
  }

  removeMarkers() {
    this._markersArr().forEach(marker => marker.setMap(null));
    this.markers = {};
  }

  removeMarkerFromWaypoint(waypoint){
    this.removeMarker(this.markers[waypoint.id]);
  }

  setMarkerEndpointIcons() {
    const markersArr = this._markersArr();
    (markersArr[markersArr.length - 1] || _nullMarker).setIcon(endImage);
    (markersArr[0] || _nullMarker).setIcon(startImage);
  }

  _lastMarker() {
    const markersArr = this._markersArr();
    return markersArr[markersArr.length - 1] || _nullMarker;
  }
  
  _markersArr() {
    return Object.values(this.markers);
  }
}

export default MarkerManager;