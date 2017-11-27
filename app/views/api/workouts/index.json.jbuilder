json.workouts do
  @workouts.each do |workout|
    json.set! workout.id do
      json.partial! 'workout', workout: workout
    end
  end
end

json.user do
  json.set! @user.id do
    json.extract! @user, :fname, :lname 
    json.workoutIds @workouts.pluck(:id)
  end
end