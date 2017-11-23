import React from 'react';

export default ({resetMap, undoLastWaypoint, recenterMap, returnToOrigin, distance}) => (
  <div className='map-overlay'>
    <div className='distance'>
      <label>Distance</label>
      <h2>{distance} mi</h2>
    </div>

    <div className='map-buttons-panel'>
      <button onClick={resetMap}
        className='map-btn'>
        <span className='clear-btn'></span>  
      </button>
      <button onClick={undoLastWaypoint}
        className='map-btn'>
        <span className='undo-btn'></span>  
      </button>
      <button onClick={recenterMap}
        className='map-btn'>
        <span className='center-btn'></span>
        </button>
      <button onClick={returnToOrigin}
        className='map-btn'>
        <span className='return-btn'></span>
      </button>
    </div>
  </div>
);