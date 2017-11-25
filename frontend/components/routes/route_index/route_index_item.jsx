import React from 'react';
import { Link } from 'react-router-dom';

const RouteIndexItem = ({ route, formatDate, handleDelete }) => (
  <tr>
  <td className='thumbnailCell'>
    {/* TODO remove API key */}
    <Link to={`/route/${route.id}`}><img src={`https://maps.googleapis.com/maps/api/staticmap?size=75x75&path=weight:3%7Ccolor:0xff0000aa%7Cenc:${route.polyline}&key=AIzaSyAHw5c9iH76L8mG_YOoFdNb12Nbt6_l0Yo`}/>
    </Link>
  </td>
  <td><Link to={`/route/${route.id}`}>
    <span>{formatDate(route)}</span></Link>
  </td>
  <td><span>{route.distance} mi</span></td>
  <td><Link to={`/route/${route.id}`}>{route.name}</Link></td>
  <td nowrap='true'>{route.city}</td>
  <td>
    <Link to={`/route/edit/${route.id}`}><span>Edit</span></Link><br/>
    <a onClick={() => handleDelete(route.id)}>
      <span>Delete</span>
    </a>
  </td>
  </tr>
);

export default RouteIndexItem;