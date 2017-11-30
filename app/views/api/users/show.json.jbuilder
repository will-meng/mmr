recent_workout_ids = []
json.workouts do
  @user.recent_workouts.each do |workout|
    json.set! workout.id do
      json.extract! workout, :id, :name, :date, :hours, 
      :mins, :secs, :distance
      json.polyline workout.route.polyline
      recent_workout_ids.push(workout.id)
    end
  end
end

recent_route_ids = []
json.routes do
    @user.recent_routes.each do |route|
      json.set! route.id do
        json.extract! route, :id, :name, :distance, :polyline
        recent_route_ids.push(route.id)
      end
    end
end

json.users do
  json.set! @user.id do
    json.partial! 'user', user: @user

    @user.calculate_lifetime_stats
    json.extract! @user, :distance, :num_workouts, :num_routes, :hours, :mins
    json.recent_workout_ids recent_workout_ids
    json.recent_route_ids recent_route_ids
  end
end