comment_ids = []

json.comments do
  @workout.comments.each do |comment|
    json.set! comment.id do
      json.partial! 'api/comments/comment', comment: comment
    end
    comment_ids.push(comment.id)
  end
end

json.workouts do
  json.set! @workout.id do
    json.partial! 'workout', workout: @workout
    json.comment_ids comment_ids
  end
end

json.users do
  @workout.commenters.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end