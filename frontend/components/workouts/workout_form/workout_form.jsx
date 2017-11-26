import React from 'react';
import LoadingModal from '../../loading/loading_modal';
import { formatDate } from '../../../utils/route_api_util';

export const _todaysDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return year + '-' + month + '-' + day;
};

const _nullState = {
  name: '',
  description: '',
  hours: '',
  mins: '',
  secs: '',
  date: _todaysDate(),
  distance: '',
  routeId: null
};

class WorkoutForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = _nullState;
    console.log(this.state);
  }

  resetForm() {
    this.setState(_nullState);
  }

  componentWillMount() {
    this.props.removeErrors();
  }

  componentDidMount() {
    this.props.requestUserRoutes(this.props.currentUser.id);
    if (this.props.formType === 'edit')
      this.props.requestWorkout(this.props.workoutId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formType !== nextProps.formType)
      if (nextProps.formType === 'new') {
        this.resetForm();
      } else {
        nextProps.requestWorkout(nextProps.workoutId)
          .then(this.checkUser.bind(this));
      }
  }

  checkUser() {
    if (this.props.workout.user_id !== this.props.currentUser.id)
      this.props.history.push(`/`);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);

    // const routeParams = ;
    // this.props.submitAction(routeParams)
    //   .then(action => this.props.history.push(`/workout/${action.workout.id}`));
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
  }
  
  render() {
    const { errors, removeErrors, loading, currentUser, routes } = this.props;

    return (
      <div className='workout-main'>
        <header> 
          <h1><span>Log a Workout</span></h1>
        </header>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className='workout-top'>
            <div className='workout-row'>
              <div className='workout-name-group workout-col'>
                <span>Workout name<span className="required"> *</span></span>
                <input type="text" id='workout-name'
                  onChange={this.update('name')}
                  value = {this.state.name}
                />
                <span className='error-msg hidden'>A workout name is required.</span>
              </div>

              <div className='workout-date-group workout-col'>
                <span>Date<span className="required"> *</span></span>
                <input type="date" id='workout-date'
                  onChange={this.update('date')}
                  value={this.state.date}
                />
              </div>
            </div>
            <div className='workout-row'>
              <div className='workout-col'>
                <span>How did it go?</span>
                <textarea rows="3"
                  onChange={this.update('description')}
                  value={this.state.description}
                ></textarea>
              </div>
            </div>
          </div>

          <div className='workout-bottom'>
            <div className='workout-bottom-row'>
              <div className='workout-row'>
                <div className='workout-col'>
                  <span>Route<span className="required"> *</span></span>
                  <select onChange={this.update('routeId')}>
                    {
                      routes.map(route => 
                        <option key={route.id} value={route.id}>{route.name}</option>
                      )
                    }
                  </select>
                  <span className='error-msg hidden'>A route is required.</span>
                </div>
              </div>
            </div>

            <div className='workout-bottom-row'>
              <span>Duration<span className="required"> *</span></span>
              <div className='workout-row'>
                <div className='workout-col workout-duration'>
                  <input type="number" className='workout-duration-input'
                    onChange={this.update('hours')}
                    placeholder='hh'
                    value={this.state.hours}
                    min='0' max='999'
                  />
                </div>
                <span> : </span>
                <div className='workout-col workout-duration'>
                  <input type="number" className='workout-duration-input'
                    onChange={this.update('mins')}
                    placeholder='mm'
                    value={this.state.mins}
                    min='0' max='59'
                  />
                </div>
                <span> : </span>
                <div className='workout-col workout-duration'>
                  <input type="number" className='workout-duration-input'
                    onChange={this.update('secs')}
                    placeholder='ss'
                    value={this.state.secs}
                    min='0' max='59'
                  />
                </div>
              </div>
              <p className='error-msg hidden'>A duration is required.</p>
            </div>

            <div className='workout-bottom-row'>
              <span>Distance<span className="required"> *</span></span>
              <div className='workout-row'>
                <div className='workout-col workout-distance'>
                  <input type="number" className='workout-distance-input'
                    onChange={this.update('distance')}
                    value = {this.state.distance}
                    min='0' maxLength='4'
                  />
                  <p className='error-msg hidden'>A distance is required.</p>
                </div>
                <span>mi</span>
              </div>
            </div>
          </div>

          <input type="submit" className='button workout-submit' value='Save'/>
        </form>

        {loading ? <LoadingModal/> : null }
      </div>
    );
  }
}

export default WorkoutForm;
