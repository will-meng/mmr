class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    if params[:id].to_i == current_user.id
      @user = current_user
      if @user.update(user_params)
        render 'api/sessions/create'
      else
        render json: @user.errors.full_messages, status: 422
      end
    else
      render json: ['Cannot update that user'], status: 404
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      render json: ['User not found'], status: 404
    end
  end

  def index
    # For user search functionality
    matcher = "%#{params[:query].downcase}%"
    @users = User.where.not(id: current_user.id)
      .where("lower(fname) LIKE ? OR lower(lname) LIKE ? OR lower(email) LIKE ?", 
              matcher, matcher, matcher) 
  end

  private

  def user_params
    params.require(:user)
      .permit(:email, :img_url, :image, :fname, :lname, :birthday, :gender, :password)
  end
end