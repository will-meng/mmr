import React from 'react';

export default ({ name, description, handleSubmit, update, errors }) => {
  const errorClass = 'error-msg', hiddenClass='hidden';
  const nameError = /Name/.test(errors) ? errorClass : hiddenClass;
  return (
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
        <span className={nameError}>A route name is required.</span>
        
        <input type="text"
          onChange={update('description')}
          placeholder='Describe this map'
          value = {description}
        />

        <input type='submit' className='submit-route' value='Save Route'/>
      </div>
    </form>
  );
};