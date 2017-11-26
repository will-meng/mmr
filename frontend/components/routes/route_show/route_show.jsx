import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import MarkerManager from '../../../utils/marker_manager';
import { 
  formatDate, 
  polylineOptions,
  decodeWaypoints 
} from '../../../utils/route_api_util';
import LoadingModal from '../../loading/loading_modal';

const creatorName = creator => (
  `${creator.fname} ${creator.lname}`
);

const defaultDescription = (route, creator) => (
  <span>
    This is a {route.distance} mi route in {route.city}. 
    This route was created by 
    <Link to={`/user/${route.creator_id}/dashboard`}> {creatorName(creator)} </Link>
    on {formatDate(route)}.
  </span>
);

class RouteShow extends React.Component {
  componentDidMount() {
    this.props.requestRoute(this.props.routeId)
      .then(() => this.props.requestUser(this.props.route.creator_id))
      .then(() => this.renderPolyline());
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.routeId !== nextProps.routeId)
      this.props.requestRoute(nextProps.routeId)
        .then(() => this.renderPolyline());
  }

  renderPolyline() {
    this.map = new google.maps.Map(this.refs.map);
    const bounds = JSON.parse(this.props.route.bounds);
    this.map.fitBounds(bounds); // set correct zoom/bounds
    const savedPath = this.decodePolyline();
    savedPath.setMap(this.map);
    this.createMarkers();
  }

  decodePolyline() {
    const polyline = this.props.route.polyline;
    const path = google.maps.geometry.encoding.decodePath(polyline);
    return new google.maps.Polyline(Object.assign({ path }, polylineOptions));
  }

  createMarkers() {
    this.MarkerManager = new MarkerManager(this.map);
    const waypointsObj = decodeWaypoints(this.props.route.waypoints);
    this.MarkerManager.createAllMarkers(waypointsObj, true);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteRoute(this.props.routeId)
      .then(this.props.history.push(`/`));
  }

  render() {
    const { route, creator, currentUser, loading } = this.props;

    if (loading || !route || !creator)
      return <LoadingModal/>;
    else {
      return ( 
        <div className='show-container'>
          { currentUser ? (
            <section className='breadcrumbs'>
              <span className='crumb'>
                <Link to={`/user/${this.props.currentUser.id}/dashboard`}>
                  Home <span></span>
                </Link>
              </span>
              <span className='crumb'>
                <Link to='/routes'>Routes <span></span></Link>
              </span>
              <span className='crumb'>
                Route Details
              </span>
            </section>
          ) : (<br/>)
          }

          <header>
              <h1>{route.name}</h1>
          </header>

          <section className='route-overview'>
            <article className='route-info'>
              <div className='distance-box'>
                <div>
                  <h4>Distance</h4>
                  <p className='number'>{route.distance}</p>
                  <p>miles</p>
                </div>
                <div>
                  <p>CLIMB</p>
                  <span>? ft</span>
                </div>

              </div>
              <div className='route-details'>
                <dl>
                <dt style={{marginBottom: '15px'}}>Begins in:</dt>
                <dd style={{marginBottom: '15px'}}>{route.city}</dd>
                <dt style={{marginBottom: '20px'}}>Created By:</dt>
                <dd style={{marginBottom: '20px'}}>
                  <Link to={`/user/${route.creator_id}/dashboard`}>
                    {creatorName(creator)}
                  </Link>
                </dd>
                <dt>Description:</dt>
                <dd>{route.description || defaultDescription(route, creator)}</dd>
                <dt>Type:</dt>
                <dd>Run</dd>
                </dl>                
              </div>
            </article>

            <article className='route-show-buttons'>
              <Link to='/route/create' className='button orange-btn'>
                Create a Route
              </Link>
              { currentUser && creator.id === currentUser.id ? (
                  <div>
                  <Link to={`/route/edit/${route.id}`} className='button'>
                    Edit
                  </Link>
                  <a onClick={e => this.handleDelete(e)} className='button'>
                    Delete
                  </a>
                </div>
                ) : (null)
              }
            </article>
          </section>

          <div className="map-show" ref="map">
            Map
          </div>
        </div>
      );
    }
  }
}

export default RouteShow;