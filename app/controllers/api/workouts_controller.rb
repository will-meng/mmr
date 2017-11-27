class Api::WorkoutsController < ApplicationController
  before_action :require_logged_in, only: [:create, :update, :destroy]

  def index
    @user = User.find_by(id: params[:userId])
    if @user
      @workouts = @user.workouts
    else
      render json: ['Cannot find that user'], status: 404
    end
  end

  def show
    @workout = Workout.find_by(id: params[:id])
    if @workout
      render :show
    else
      render json: ['Cannot find that workout'], status: 404
    end
  end

  def create
    @workout = Workout.new(workout_params)
    @workout.user_id = current_user.id
    route = current_user.routes.find_by(id: @workout.route_id)
    if route
      @workout.distance = route.distance
    else
      @workout.route_id = nil # fake route_id given to server
    end

    if @workout.save
      render :show
    else
      render json: @workout.errors.full_messages, status: 422
    end
  end

  def update
    @workout = current_user.workouts.find_by(id: params[:id])
    if @workout
      if @workout.update(workout_params)
        render :show
      else
        render json: @workout.errors.full_messages, status: 422
      end
    else
      render json: ['Cannot find that workout'], status: 404
    end
  end

  def destroy
    @workout = current_user.workouts.find_by(id: params[:id])
    if @workout
      @workout.destroy
      render :show
    else
      render json: ['You did not create that workout'], status: 422
    end
  end

  private

  def workout_params
    params.require(:workout)
      .permit(:name, :description, :date, :route_id, :hours, :mins, :secs)
  end
end
