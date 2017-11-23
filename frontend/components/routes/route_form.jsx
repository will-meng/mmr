import React from 'react';
import RunMap from './run_map';

class RouteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', description: '', distance: 0, coordinates: []};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createRoute(Object.assign({}, this.state));
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
  }

  render() {

    return (
      <div className='route-main'>
        <form onSubmit={this.handleSubmit} className='route-form'>
          <h3>Route Details</h3>
          <input type="text"
            onChange={this.update('name')}
            placeholder='Name this map'
            value = {this.state.name}
          />
          <input type="text"
            onChange={this.update('description')}
            placeholder='Describe this map'
            value = {this.state.description}
          />

          <input type='submit' className='submit-route' value='Save Route'/>
        </form>

        <RunMap/>
      </div>
    );
  }
}

export default RouteForm;