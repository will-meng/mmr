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
    });

    if (this._markersArr().length === 0) {
      marker.setIcon(startImage);
    } else if (this._markersArr().length === 1) {
      marker.setIcon(endImage);
    } else {
      this._lastMarker().setIcon(midImage);
      marker.setIcon(endImage);
    }

    marker.addListener('click', () => {
      this.removeMarker(marker);
      return this.handleClick(waypoint);
    });

    marker.addListener('dragend', () => {
      waypoint.latLng = marker.position;
      return this.handleDrag(waypoint);
    });

    this.markers[marker.id] = marker;
  }

  removeMarker(marker) {
    this.markers[marker.id].setMap(null);
    delete this.markers[marker.id];
    this._lastMarker().setIcon(endImage);
  }

  removeMarkers() {
    this._markersArr().forEach(marker => marker.setMap(null));
    this.markers = {};
  }

  removeMarkerFromWaypoint(waypoint){
    this.removeMarker(this.markers[waypoint.id]);
  }

  _lastMarker() {
    return this._markersArr()[this._markersArr().length - 1];
  }

  _markersArr() {
    return Object.values(this.markers);
  }
}

export default MarkerManager;