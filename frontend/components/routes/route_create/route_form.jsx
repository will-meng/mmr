import React from 'react';

const handleErrors = errors => {
  if (/Name/.test(errors)) {
    $('#route-name').addClass('error-border');
    $('.error-msg').removeClass('hidden');
  }
};

export default ({ name, description, handleSubmit, update, errors }) => {
  handleErrors(errors);

  return (
    <form onSubmit={handleSubmit} className='route-panel'>
      <h3>Route Details</h3>

      <div className='route-form'>
        <div>
          <input type="text" id='route-name'
            onChange={update('name')}
            placeholder='Name this map'
            value = {name}
          />
          <span className="required">*</span>
        </div>
        <span className='error-msg hidden'>A route name is required.</span>
        
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