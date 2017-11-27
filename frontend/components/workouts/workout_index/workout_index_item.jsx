import React from 'react';
import { Link } from 'react-router-dom';

const runImage = 'http://static.mapmyfitness.com/d/website/activity_icons/run.png';

const WorkoutIndexItem = ({ workout }) => (
  <li>
    <Link to={`/workout/${workout.id}`}>
      <img src={runImage} alt="Running Logo" />
      <div className='box-info'>
        <span>{workout.name}</span><br/>
        <span>{workout.distance} mi</span>
      </div>
    </Link>
  </li>
);

export default WorkoutIndexItem;