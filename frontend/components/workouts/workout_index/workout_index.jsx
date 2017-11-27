import React from 'react';
import { Link } from 'react-router-dom';
// import RouteIndexItem from './route_index_item';
import LoadingModal from '../../loading/loading_modal';

class WorkoutIndex extends React.Component {
  render() {
    const { workouts, currentUser, owner, loading } = this.props;
    return (
      <div>
        {
          workouts.map(workout => 
            <Link to={`/workout/${workout.id}`} key={workout.id}>
              {workout.name}
            </Link>
          )
        }
      </div>
    );
  }
}

export default WorkoutIndex;