import React from 'react';
import { Link } from 'react-router-dom';
import LoadingModal from '../../loading/loading_modal';

const creatorName = creator => (
  `${creator.fname} ${creator.lname}`
);

const _stepsPerMile = 2300;

class WorkoutShow extends React.Component {
  componentDidMount() {
    this.props.requestWorkout(this.props.workoutId)
      .then(() => this.props.requestUser(this.props.workout.user_id));
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.workoutId !== nextProps.workoutId)
      this.props.requestWorkout(nextProps.workoutId)
        .then(() => this.props.requestUser(nextProps.workout.user_id));
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteWorkout(this.props.workoutId)
      .then(() => 
        this.props.history.push(`/user/${this.props.currentUser.id}/workouts`)
      );
  }

  _formatDuration(hours, mins, secs) {
    if (hours) 
      return `${hours}:${String(mins).padStart(2, '0')}:` +
        `${String(secs).padStart(2, '0')}`;
    if (mins)
      return `${String(mins).padStart(2, '0')}:` +
        `${String(secs).padStart(2, '0')}`;
    return secs;
  }

  _formatPace(distance, hours, mins, secs) {
    const totalMins = hours * 60 + mins + secs / 60;
    const pace = totalMins / distance;
    const paceMins = Math.floor(pace);
    const paceSecs = Math.round((pace - paceMins) * 60);
    return `${String(paceMins).padStart(2, '0')}:` +
      `${String(paceSecs).padStart(2, '0')}`;
  }

  render() {
    const { workout, creator, currentUser, loading } = this.props;

    if (loading || !workout || !creator)
      return <LoadingModal/>;
    else {
      const steps = Math.round(workout.distance * _stepsPerMile);
      const duration = 
        this._formatDuration(workout.hours, workout.mins, workout.secs);
      const pace = this._formatPace(
        workout.distance, workout.hours, workout.mins, workout.secs
      );
      
      return (
        <div className='workout-container'>
        { currentUser ? (
          <section className='breadcrumbs'>
            <span className='crumb'>
              <Link to={`/user/${this.props.currentUser.id}/dashboard`}>
                Home <span></span>
              </Link>
            </span>
            <span className='crumb'>
              <Link to={`/user/${currentUser.id}/workouts`}
                >My Workouts <span></span>
              </Link>
            </span>
            <span className='crumb'>
              Workout Details
            </span>
          </section>
        ) : (<br/>)
        }
          <section className='workout-overview'>
            <h2>{workout.name}</h2>
            <p>Notes: {workout.description}</p>
            <span>by <Link to={`/user/${workout.user_id}/dashboard`}>
                       {creatorName(creator)}
                     </Link>
            </span>
            <div className='stats-summary'>
              <div className='stat-col'>
                <p>Distance</p>
                <span>{workout.distance.toFixed(2)}<span>mi</span></span>
              </div>
              <div className='stat-col'>
                <p>Steps</p>
                <span>{steps}</span>
              </div>
              <div className='stat-col'>
                <p>Duration</p>
                <span>{duration}</span>
              </div>
              <div className='stat-col'>
                <p>Avg Pace</p>
                <span>{pace}</span>
              </div>
            </div>

          </section>


          <article className='workout-show-buttons'>
            <Link to='/workout/create' className='button orange-btn'>
              Log a Workout
            </Link>
            { currentUser && creator.id === currentUser.id ? (
                <div>
                <Link to={`/workout/edit/${workout.id}`} className='button'>
                  Edit
                </Link>
                <a onClick={e => this.handleDelete(e)} className='button'>
                  Delete
                </a>
              </div>
              ) : (null)
            }
          </article>

          {/* TODO remove API key */}
          <Link to={`/route/${workout.route_id}`}>
            <img src={`https://maps.googleapis.com/maps/api/staticmap?size=625x350&path=weight:5%7Ccolor:0xff000077%7Cenc:${workout.polyline}&key=AIzaSyAHw5c9iH76L8mG_YOoFdNb12Nbt6_l0Yo`}/>
          </Link>
        </div>
      );
    }
  }
}

export default WorkoutShow;