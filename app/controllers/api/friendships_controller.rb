class Api::FriendshipsController < ApplicationController
  before_action :require_logged_in

  def index; end

  def create
    # Create a new outgoing friendship
    @friendship = Friendship.new(
      requestor_id: current_user.id,
      requestee_id: params[:requesteeId],
      confirmed: false
      )
    if @friendship.save
      render :create
    else
      render json: @friendship.errors.full_messages, status: 422
    end
  end

  def update
    # Confirm a pending incoming friendship
    friendship = 
      current_user.pending_friendships.find_by(requestor_id: params[:id])
    
    if friendship
      friendship.confirmed = true
      if friendship.save
        render :update
      else
        render json: friendship.errors.full_messages, status: 422
      end
    else
      render json: ['Cannot find that friendship'], status: 404
    end
  end

  def destroy
    # Cancel an outgoing, Deny an incoming, or Unfriend
    friendship = 
      current_user.pending_friendships.find_by(requestor_id: params[:id]) ||
      current_user.requested_friendships.find_by(requestee_id: params[:id])
      
    if friendship
      friendship.destroy
      render :destroy
    else
      render json: ['Cannot find that friendship'], status: 404
    end
  end
end
