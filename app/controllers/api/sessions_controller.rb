class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user
      login(@user)
      render :create
    else
      render json: ['Incorrect username or password. Please try again.'],
        status: 422
    end
  end

  def show
    # send back current user data for "My Profile" page
    @user = current_user
    if @user
      render :create
    else
      render json: ['Not logged in'], status: 404
    end
  end

  def destroy
    if logged_in?
      logout
      render json: {}
    else
      render json: ['Not logged in'], status: 404
    end
  end
end
