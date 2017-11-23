import React from 'react';

export default ({ name, description, handleSubmit, update }) => (
  <form onSubmit={handleSubmit} className='route-panel'>
    <h3>Route Details</h3>

    <div className='route-form'>
      <div>
        <input type="text"
          onChange={update('name')}
          placeholder='Name this map'
          value = {name}
        />
        <span className="required">*</span>
      </div>
      
      <input type="text"
        onChange={update('description')}
        placeholder='Describe this map'
        value = {description}
      />

      <input type='submit' className='submit-route' value='Save Route'/>
    </div>
  </form>
);