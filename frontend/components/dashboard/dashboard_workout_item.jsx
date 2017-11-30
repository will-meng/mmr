import React from 'react';
import { Link } from 'react-router-dom';

const _formatDuration = (hours, mins, secs) => {
  if (hours) 
    return `${hours}:${String(mins).padStart(2, '0')}:` +
      `${String(secs).padStart(2, '0')}`;
  if (mins)
    return `${String(mins).padStart(2, '0')}:` +
      `${String(secs).padStart(2, '0')}`;
  return secs;
};

const formatDate = date => {
  const [year, month, day] = date.split('-');
  return month + '/' + day + '/' + year;
};

const DBWorkoutItem = ({ workout }) => (
  <li className='dashboard-workout-item'>
    {/* TODO remove API key */}
    <Link to={`/workout/${workout.id}`} className='dbw-col'>
      <img src={`https://maps.googleapis.com/maps/api/staticmap?size=90x90&path=weight:3%7Ccolor:0xff0000aa%7Cenc:${workout.polyline}&key=AIzaSyAHw5c9iH76L8mG_YOoFdNb12Nbt6_l0Yo`}/>
    </Link>
    <div className='name-distance-group dbw-col'>
      <Link to={`/workout/${workout.id}`}>{workout.name}</Link>
      <h4>Distance</h4>
      <p>{workout.distance}<small>mi</small></p>
    </div>
    <div className='duration-group dbw-col'>
      <h4>Duration</h4>
      <p>{_formatDuration(workout.hours, workout.mins, workout.secs)}</p>
    </div>
    <div className='date-group dbw-col'>
      <p>{formatDate(workout.date)}</p>
      <p>Activity</p>
      <img src="http://mmf.cachefly.net/d/website/activity_icons/new/run.png"/>
    </div>
  </li>
);

export default DBWorkoutItem;