import React from 'react';
import { Link } from 'react-router-dom';
import RouteIndexItem from './route_index_item';
import formatDate from '../../../utils/route_api_util';

class RouteIndex extends React.Component {
  componentDidMount() {
    this.requestRoutesConditional(this.props.ownerId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ownerId !== nextProps.ownerId) {
      this.requestRoutesConditional(nextProps.ownerId);
    }
  }

  requestRoutesConditional(ownerId) {
    if (ownerId) {
      this.props.requestUser(ownerId);
      this.props.requestUserRoutes(ownerId);
    } else {
      this.props.requestRoutes();
    }
  }

  handleDelete(routeId) {
    this.props.deleteRoute(routeId);
  }

  titleName(owner, currentUser) {
    if (owner)
      if (currentUser && owner.id === currentUser.id )
        return 'My';
      else
        return `${owner.fname} ${owner.lname}'s`;
    else
      return 'All';
  }

  render() {
    const { routesObj, currentUser, owner } = this.props;
    let filteredRoutes;
    if (owner && owner.routeIds)
      filteredRoutes = owner.routeIds.map(routeId => routesObj[routeId]);
    else
      filteredRoutes = Object.values(routesObj);
 
    if (false) // TODO implement loading
      return (<h1>LOADING...</h1>);
    else {
      return ( 
        <div className='route-index-container'>
          <div className='index-title'>
            <h1>{this.titleName(owner, currentUser)} Routes</h1>  
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
                filteredRoutes.reverse().map(route => (
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