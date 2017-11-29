json.comments do
  json.set! @comment.id do
    json.partial! 'comment', comment: @comment
  end
end

json.workouts do
  json.set! @comment.workout_id do
    json.comment_ids @comment.workout.comment_ids
  end
end