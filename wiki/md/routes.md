# Routes

## HTML

+ `GET /` `StaticPagesController#root`

## API Endpoints

### `users`
+ `GET /api/users` - returns the user information for the Friend Search feature
+ `GET /api/users/:id` - returns user information
+ `POST /api/users` - sign up
+ `PATCH /api/users/:id` - edit a user

### `friendships`
+ `POST /api/friendships` - creates a friendship (confirmed = false)
+ `PATCH /api/friendships/:id` - edit a friendship (confirmed = true)
+ `DELETE /api/friendships/:id` - remove a friendship

Note: friendships does not include a `GET` route because we will have these routes render the `api/users/show.json.jbuilder` view. See [Sample State](sample-state).

### `session`
+ `POST /api/session` - log in
+ `DELETE /api/session` - log out

### `routes`
+ `GET /api/routes` - returns relevant routes (filtered by `data`/`params`)
+ `GET /api/routes/:id` - returns route
+ `POST /api/routes` - creates a route
+ `PATCH /api/routes/:id` - edit a route
+ `DELETE /api/routes/:id` - remove a route

### `workouts`
+ `GET /api/workouts` - returns relevant workouts (filtered by `data`/`params`)
+ `GET /api/workouts/:id` - returns workout
+ `POST /api/workouts` - creates a workout
+ `PATCH /api/workouts/:id` - edit a workout
+ `DELETE /api/workouts/:id` - remove a workout

---

## Frontend Routes
+ `/auth/login`
+ `/auth/signup`
+ `/` - splash screen before login
+ `/my_home/user_dashboard` - own dashboard, homepage when logged in
+ `/my_home/activity_feed` - own feed (includes comments and comment form)
+ `/account/my_profile` - user edit
+ `/profile/:userId/user_dashboard` - other user's dashboard, default "show"
+ `/profile/:userId/activity_feed` - other user's feed
+ `/people/friends` - friends index
+ `/people/friends/find` - user search (to add friends)
+ `/workouts` - workout index
+ `/workout/:workoutId` - workout show (includes comments and comment form)
+ `/workout/create` - create a workout
+ `/workout/edit/:workoutId` - update a workout
+ `/routes/my_routes` - route index
+ `/route/view/:routeId` - route show
+ `/routes/create` - create a route
+ `/routes/edit/:routeId` - update a route
