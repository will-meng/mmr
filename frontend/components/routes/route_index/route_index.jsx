import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class RouteIndex extends React.Component {
  componentDidMount() {
    this.props.requestRoutes();
  }

  handleDelete(routeId) {
    this.props.deleteRoute(routeId);
  }

  formatDate(route) {
    const date = new Date(route.created_at);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return month + '/' + day + '/' + year;
  }

  render() {
    const { routes } = this.props;
 
    if (false) // TODO implement loading
      return (<h1>LOADING...</h1>);
    else {
      return ( 
        <div className='route-index-container'>
          <div className='index-title'>
            <h1>My Routes</h1>  
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
                <tr key={route.id}>
                <td className='thumbnailCell'>
                  <Link to={`/route/${route.id}`}><img src='/'/></Link>
                </td>
                <td><Link to={`/route/${route.id}`}>
                  <span>{this.formatDate(route)}</span></Link>
                </td>
                <td><span>{route.distance} mi</span></td>
                <td><Link to={`/route/${route.id}`}>{route.name}</Link></td>
                <td nowrap='true'>{route.city}</td>
                <td>
                  <Link to={`/route/edit/${route.id}`}><span>Edit</span></Link>
                  <a onClick={() => this.handleDelete(route.id)}>
                    <span>Delete</span>
                  </a>
                </td>
                </tr>
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

export default withRouter(RouteIndex);