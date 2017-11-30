import React from 'react';
import { Link } from 'react-router-dom';
import LoadingModal from '../loading/loading_modal';
import DBWorkoutItem from './dashboard_workout_item';
import DBRouteItem from './dashboard_route_item';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.requestUser(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId)
      this.props.requestUser(nextProps.userId);
  }

  render() {
    const { user, loading, workouts, routes } = this.props;
    console.log(this.props);
    if (loading || !user || !user.recent_workout_ids)
      return <LoadingModal/>;
    else
      return (
      <div className='dashboard-container'>
        <header>
          <h2>Lifetime Stats</h2>
        </header>
        <div className='lifetime-stats-panel'>
          <div className='lifetime-stats-col'>
            <h4>Distance</h4>
            <p>{user.distance}</p>
            <p>miles</p>
          </div>
          <div className='lifetime-stats-col'>
            <h4>Duration</h4>
            <p>{user.hours}:{user.mins}</p>
            <p>hours</p>
          </div>
          <div className='lifetime-stats-col'>
            <h4>Routes</h4>
            <p>{user.num_routes}</p>
            <p>created</p>
          </div>
          <div className='lifetime-stats-col'>
            <h4>Workouts</h4>
            <p>{user.num_workouts}</p>
            <p>completed</p>
          </div>
        </div>

        <div className='recent-workouts-container'>
          <header>
            <h2>Recent Workouts</h2>
            <Link to={`/user/${user.id}/workouts`}>View All</Link>
          </header>
          <ul>
            {
              user.recent_workout_ids.map(id => 
                <DBWorkoutItem key={id} workout={workouts[id]}/>
              )
            }
          </ul>
        </div>

        <div className='recent-routes-container'>
          <header>
            <h2>Recent Routes</h2>
            <Link to={`/user/${user.id}/routes`}>View All</Link>
          </header>
          <ul>
            {
              user.recent_route_ids.map(id => 
                <DBRouteItem key={id} route={routes[id]}/>
              )
            }
          </ul>
        </div>
      </div>
      );
  }
}

export default Dashboard;