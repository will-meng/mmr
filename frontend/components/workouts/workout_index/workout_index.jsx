import React from 'react';
import { Link } from 'react-router-dom';
import WorkoutIndexItem from './workout_index_item';
import LoadingModal from '../../loading/loading_modal';

class WorkoutIndex extends React.Component {
  componentDidMount() {
    this.props.requestUserWorkouts(this.props.ownerId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ownerId !== nextProps.ownerId) {
      this.props.requestUserWorkouts(nextProps.ownerId);
    }
  }

  render() {
    const { workouts, currentUser, owner, loading } = this.props;
    
    if (loading || !owner)
      return <LoadingModal/>;
    else
      return (
        <div className='workout-index-container'>
          <div className='index-title'>
            <h1>{`${owner.fname} ${owner.lname}'s`} Workouts</h1>  
            <Link to='/workout/create' className='orange-btn button-sq'>
              Log a Workout
            </Link>
          </div>

          <ul className='workout-list'>
            {
              workouts.reverse().map(workout => 
                <WorkoutIndexItem workout={workout} key={workout.id}/>
              )
            }
          </ul>
        </div>
      );
  }
}

export default WorkoutIndex;