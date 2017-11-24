import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';

class RouteShow extends React.Component {
  componentDidMount() {
    this.props.requestRoute(this.props.routeId)
      // .then(() => this.props.requestUser(this.props.route.creator_id))
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

  handleDelete() {
    return e => {
      e.preventDefault();
      this.props.deleteRoute(this.props.routeId)
        .then(this.props.history.push('/'));
    };
  }

  render() {
    const { route, creator } = this.props;
    

    if (!route || !creator)
      return (<h1>LOADING...</h1>);
    else {
      const creatorName = `${creator.fname} ${creator.lname}`;
      return ( 
        <div className='show-container'>
          <section className='breadcrumbs'>
            <span className='crumb'>
              <Link to='/dashboard'>Home <span></span></Link>
            </span>
            <span className='crumb'>
              <Link to='/routes'>My Routes <span></span></Link>
            </span>
            <span className='crumb'>
              Route Details
            </span>
          </section>

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
                <dd style={{marginBottom: '15px'}}>Placeholder Start City</dd>
                <dt style={{marginBottom: '20px'}}>Created By:</dt>
                <dd style={{marginBottom: '20px'}}>
                  <Link to={`user/${route.creator_id}/dashboard`}>
                    {creatorName}
                  </Link>
                </dd>
                <dt>Description:</dt>
                <dd>{route.description}</dd>
                <dt>Type:</dt>
                <dd>Run</dd>
                </dl>                
              </div>
            </article>

            <article className='route-show-buttons'>
              <Link to='/route/create' className='button orange-btn'>
                Create a Route
              </Link>
              <Link to={`/route/edit/${route.id}`} className='button'>
                Edit
              </Link>
              <a onClick={this.handleDelete()} className='button'>
                Delete
              </a>
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

export default withRouter(RouteShow);