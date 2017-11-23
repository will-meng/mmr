class Api::RoutesController < ApplicationController
  before_action :require_logged_in

  def index
    @routes = current_user.routes
  end

  def show
    @route = Route.find(id: params[:id])
    if @route
      render :show
    else
      render json: ['Cannot find that route'], status: 404
    end
  end

  def create
    @route = Route.new(route_params)
    @route.creator_id = current_user.id
    if @route.save
      render :show
    else
      render json: @route.errors.full_messages, status: 422
    end
  end

  def edit
    @route = current_user.routes.find(id: params[:id])
    if @route
      if @route.update(route_params)
        render :show
      else
        render json: @route.errors.full_messages, status: 422
      end
    else
      render json: ['Cannot find that route'], status: 404
    end
  end

  def destroy
    @route = current_user.routes.find(id: params[:id])
    if @route
      @route.destroy
      render :show
    else
      render json: ['You did not create that route'], status: 422
    end
  end

  private

  def route_params
    params.require(:route)
      .permit(:name, :description, :distance, :polyline, waypoints: [])
  end
end
