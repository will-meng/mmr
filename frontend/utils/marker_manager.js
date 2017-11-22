class MarkerManager {
  constructor(map, handleClick, handleDrag){
    this.map = map;
    this.handleClick = handleClick;
    this.handleDrag = handleDrag;
    this.markers = {};
    this.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.labelIndex = 0;
  }

  createMarker(waypoint) {
    const marker = new google.maps.Marker({
      position: waypoint.latLng,
      map: this.map,
      id: waypoint.id,
      label: this.labels[this.labelIndex++ % 26],
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
}

export default MarkerManager;