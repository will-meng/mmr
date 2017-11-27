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

// [field name, regex matcher]
const errorFields = [
  ["WNamee", "Name can't be blank"], 
  ["WRoutee", "Route can't be blank"],
  ["WDuratione", "Duration can't be blank"]];

const _nullState =  {
    name: '',
    description: '',
    hours: '',
    mins: '',
    secs: '',
    date: _todaysDate(),
    route_id: null
};

class WorkoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = _nullState;

    this.requestUserRoutesAndSetRouteId.bind(this);
  }

  resetForm() {
    this.setState(_nullState);
  }

  componentWillMount() {
    this.props.removeErrors();
  }

  componentDidMount() {
    this.requestUserRoutesAndSetRouteId();
    if (this.props.formType === 'edit')
      this.props.requestWorkout(this.props.workoutId)
        .then(this.checkUser.bind(this))
        .then(this.loadState.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formType !== nextProps.formType)
      if (nextProps.formType === 'new') {
        this.resetForm();
        this.requestUserRoutesAndSetRouteId();
      } else {
        nextProps.requestWorkout(nextProps.workoutId)
          .then(this.checkUser.bind(this))
          .then(this.loadState.bind(this));
      }
  }

  requestUserRoutesAndSetRouteId() {
    this.props.requestUserRoutes(this.props.currentUser.id)
      .then(() => {
        this.setState({ route_id: Object.keys(this.props.routesObj)[0] });
    });
  }

  checkUser() {
    if (this.props.workout.user_id !== this.props.currentUser.id)
      this.props.history.push(`/`);
  }

  loadState() {
    const newState = Object.assign({}, this.props.workout);
    delete newState.polyline;
    delete newState.distance;
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();
    const workoutParams = Object.assign({}, this.state);
    if (!workoutParams.hours) workoutParams.hours = 0;
    if (!workoutParams.mins) workoutParams.mins = 0;
    if (!workoutParams.secs) workoutParams.secs = 0;
    console.log(workoutParams);
    this.props.submitAction(workoutParams)
      .then(action => 
        this.props.history.push(`/workout/${action.workout.id}`),
        this.handleErrors.bind(this));
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
  }

  handleErrors() {
    errorFields.forEach(([field, regex]) => {
      if (RegExp(regex).test(this.props.errors)) {
        $(`#${field}`).removeClass("hidden");
        $(`#${field.slice(0, -1)}`).addClass("error-border");
        if (field === "WDuratione")
          $(`.${field.slice(0, -1)}`).addClass("error-border");
      } else {
        $(`#${field}`).addClass("hidden");
        $(`#${field.slice(0, -1)}`).removeClass("error-border");
        if (field === "WDuratione")
          $(`.${field.slice(0, -1)}`).removeClass("error-border");
      }
    });
  }
  
  render() {
    const { errors, removeErrors, loading, currentUser, routesObj } = this.props;
    const selectedRoute = routesObj[this.state.route_id];
    const distance = selectedRoute && selectedRoute.distance;

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
                <input type="text" id='WName'
                  onChange={this.update('name')}
                  value = {this.state.name}
                />
                <span className='error-msg hidden' id='WNamee'>
                  A workout name is required.
                </span>
              </div>

              <div className='workout-date-group workout-col'>
                <span>Date<span className="required"> *</span></span>
                <input type="date"
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
                  <select onChange={this.update('route_id')} id='WRoute'>
                    {
                      Object.values(routesObj).map(route => 
                        <option key={route.id} value={route.id}>{route.name}</option>
                      )
                    }
                  </select>
                  <span className='error-msg hidden' id='WRoutee'>
                    A route is required.
                  </span>
                </div>
              </div>
            </div>

            <div className='workout-bottom-row'>
              <span>Duration<span className="required"> *</span></span>
              <div className='workout-row'>
                <div className='workout-col workout-duration'>
                  <input type="number" 
                    className='workout-duration-input WDuration'
                    onChange={this.update('hours')}
                    placeholder='hh'
                    value={this.state.hours}
                    min='0' max='999'
                  />
                </div>
                <span> : </span>
                <div className='workout-col workout-duration'>
                  <input type="number"
                    className='workout-duration-input WDuration'
                    onChange={this.update('mins')}
                    placeholder='mm'
                    value={this.state.mins}
                    min='0' max='59'
                  />
                </div>
                <span> : </span>
                <div className='workout-col workout-duration'>
                  <input type="number"
                    className='workout-duration-input WDuration'
                    onChange={this.update('secs')}
                    placeholder='ss'
                    value={this.state.secs}
                    min='0' max='59'
                  />
                </div>
              </div>
              <p className='error-msg hidden' id='WDuratione'>
                A duration is required.
              </p>
            </div>

            <div className='workout-bottom-row'>
              <span>Distance</span>
              <div className='workout-row'>
                <div className='workout-col workout-distance'>
                  <span className='workout-distance-input'>{distance}</span>
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
