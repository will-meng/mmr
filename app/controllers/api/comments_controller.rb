class Api::CommentsController < ApplicationController
  before_action :require_logged_in
  
  def create
    @comment = Comment.new(comment_params)
    @comment.commenter_id = current_user.id
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = current_user.comments.find_by(id: params[:id])
    if @comment
      @comment.destroy
      render :show
    else
      render json: ['Cannot find that comment'], status: 404
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :workout_id)
  end
end
