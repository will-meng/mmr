import React from 'react';
import { Link } from 'react-router-dom';
import RouteIndexItem from './route_index_item';
import formatDate from '../../../utils/route_api_util';

class RouteIndex extends React.Component {
  componentDidMount() {
    this.props.requestRoutes();
  }

  handleDelete(routeId) {
    this.props.deleteRoute(routeId);
  }

  render() {
    const { routes, currentUser } = this.props;
 
    if (false) // TODO implement loading
      return (<h1>LOADING...</h1>);
    else {
      return ( 
        <div className='route-index-container'>
          <div className='index-title'>
            <h1>All Routes</h1>  
            <Link to='/route/create' className='orange-btn button-sq'>
              Create a Route
            </Link>
          </div>

          <section className='index-table'>
            <table>
            <thead><tr>
              <th className="thumbnailCell"><span>Route</span></th>
              <th><span>Created</span></th>
              <th><span>Distance</span></th>
              <th className='name-col'><span>Name</span></th>
              <th><span>City</span></th>
              <th><span>Options</span></th>
            </tr></thead>
            <tbody>
              {
                routes.reverse().map(route => (
                  <RouteIndexItem 
                    key={route.id} 
                    route={route}
                    currentUser={currentUser}
                    handleDelete={this.handleDelete.bind(this)}
                  />
                ))
              }
            </tbody>
            </table>
          </section>
        </div>
      );
    }
  }
}

export default RouteIndex;