import React from 'react';
import { Link } from 'react-router-dom';

const DBRouteItem = ({ route }) => (
  <li>
    <Link to={`/route/${route.id}`}>
      <img src={`https://maps.googleapis.com/maps/api/staticmap?size=138x135&path=weight:3%7Ccolor:0xff0000aa%7Cenc:${route.polyline}&key=AIzaSyAHw5c9iH76L8mG_YOoFdNb12Nbt6_l0Yo`} alt="Route Map Thumbnail" />
      <div className='box-info'>
        <span>{route.name}</span><br/>
        <span>{route.distance} mi</span>
      </div>
    </Link>
  </li>
);

export default DBRouteItem;