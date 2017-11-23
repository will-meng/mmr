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
      // icon: {
      //   path: google.maps.SymbolPath.CIRCLE,
      //   scale: 3
      // },
      draggable: true,
    });

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
  }

  removeMarkers() {
    Object.values(this.markers).forEach(marker => marker.setMap(null));
    this.markers = {};
  }

  removeMarkerFromWaypoint(waypoint){
    this.removeMarker(this.markers[waypoint.id]);
  }
}

export default MarkerManager;