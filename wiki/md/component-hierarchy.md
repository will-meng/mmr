# React Component Hierarchy

## Functional Component Hierarchy
+ `Root`
  + `App`
    + `NavBar`
    + `MainPage`
    + `Footer`

## NavBar
+ `NavBar`
  + Components:
    + `SessionButtonsContainer` + `SessionButtons`
      + State: `session`

**Note:** All other components are rendered inside of `MainPage`

## Dashboard
+ `DashboardContainer` + `Dashboard`
  + Route: `/#/my_home/user_dashboard` and `/#/profile/:userId/user_dashboard`
  + State: `workouts`, `routes`
  + Components:
    + `DashboardWorkoutIndexContainer` + `DashboardWorkoutIndex`
        + State: `workouts`, `routes`
        + Components: `DashboardWorkoutIndexItem`
          + State: `workouts[:id]`, `routes[:id]`, `ui`
    + `DashboardRouteIndexContainer` + `DashboardRouteIndex`
        + State: `routes`
        + Components: `DashboardRouteIndexItem`
          + State: `routes[:id]`, `ui`

## Feed
+ `FeedIndexContainer` + `FeedIndex`
  + Route: `/my_home/activity_feed` and `/profile/:userId/activity_feed`
  + State: `workouts`, `routes`, `users`, `comments`
  + Components:
    + `FeedIndexItem`
      + State: `workouts[:id]`, `routes[:id]`, `comments[:id]`, `users[:id]`, `ui`
      + Components:
        + `CommentIndexContainer` + `CommentIndex`
          + State: `comments`
          + Components:
            + `CommentIndexItem`
            + State: `comments[:id]`, `ui`
        + `CommentForm`
          + State: `errors.commentForm`

## Workouts
+ `WorkoutIndexContainer` + `WorkoutIndex`
  + Route: `/#/workouts`
  + State: `workouts`, `routes`
  + Components:
      + `WorkoutIndexItem`
        + State: `workouts[:id]`, `routes[:id]`, `ui`

+ `WorkoutShowContainer` + `WorkoutShow`
  + Route: `/#/workout/:workoutId`
  + State: `workouts[:id]`, `routes[:id]`, `ui`
    + Components:
      + `CommentIndexContainer` + `CommentIndex`
        + State: `comments`
        + Components:
          + `CommentIndexItem`
          + State: `comments[:id]`, `ui`
      + `CommentForm`
        + State: `errors.commentForm`

+ `WorkoutFormContainer` + `WorkoutForm`
  + Route: `/#/workout/create` and `/#/workout/edit/:workoutId`
  + State: `routes`, `errors.workoutForm`

## Routes
+ `RouteIndexContainer` + `RouteIndex`
  + Route: `/#/routes/my_routes`
  + State: `routes`
  + Components:
      + `RouteIndexItem`
        + State: `routes[:id]`, `ui`

+ `RouteShowContainer` + `RouteShow`
  + Route: `/#/route/view/:routeId`
  + State: `routes[:id]`, `ui`

+ `RouteFormContainer` + `RouteForm`
  + Route: `/#/routes/create` and `/#/routes/edit/:routeId`
  + State: `errors.routeForm`

## Session
+ `SessionFormContainer` + `SessionForm`
  + Route: `/#/auth/login` and `/#/auth/signup`
  + State: `errors.login` and `errors.signup`

## Users/Friends
+ `FriendRequestIndexContainer` + `FriendRequestIndex`
  + Route: `/#/people/friends`
  + State: `users`
  + Components:
    + `FriendRequestIndexItem`
    + State: `users[:id]`
+ `FriendIndexContainer` + `FriendIndex`
  + Route: `/#/people/friends`
  + State: `users`
  + Components:
    + `FriendIndexItem`
    + State: `users[:id]`

+ `UserSearchIndexContainer` + `UserSearchIndex`
  + Route: `/#/people/friends/find`
  + State: `ui`
  + Components:
    + `UserSearch`
    + `UserSearchIndexItem`
    + State: none (will be made with separate ajax)
