# Database Schema

## `users`
| column name       | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `id`              | integer   | not null, primary key     |
| `email`           | string    | not null, indexed, unique |
| `img_url`         | string    | not null                  |
| `fname`           | string    | not null                  |
| `lname`           | string    | not null                  |
| `birthday`	      | date	    | not null		              |
| `gender`	        | string	  | not null		              |
| `password_digest` | string    | not null                  |
| `session_token`   | string    | not null, indexed, unique |
| `created_at`      | datetime  | not null                  |
| `updated_at`      | datetime  | not null                  |

## `friendships`
| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, primary key          |
| `requester_id`    | string    | not null, indexed, foreign key |
| `accepter_id`     | string    | not null, indexed, foreign key |
| `confirmed`       | boolean   | not null                       |
| `created_at`      | datetime  | not null                       |
| `updated_at`      | datetime  | not null                       |

+ `requester_id` and `accepter_id` references `users`
+ index on `[:requester_id, :accepter_id], unique: true`

## `workouts`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `name`               | string    | not null                       |
| `user_id`            | integer   | not null, indexed, foreign key |
| `date`	             | date	     | not null		                    |
| `description`        | text      | not null                       |
| `route_id`           | integer   | not null, indexed, foreign key |
| `duration`           | integer   | not null                       |
| `created_at`         | datetime  | not null                       |
| `updated_at`         | datetime  | not null                       |

+ `user_id` references `users`
+ `route_id` references `routes`  

## `routes`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `name`               | string    | not null                       |
| `creator_id`         | integer   | not null, indexed, foreign key |
| `description`        | text      | not null                       |
| `distance`           | float     | not null                       |
| `coordinates`	       | decimal   | not null, array                |
| `created_at`         | datetime  | not null                       |
| `updated_at`         | datetime  | not null                       |

+ `creator_id` references `users`  

## `comments`
| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, primary key          |
| `author_id`       | integer   | not null, indexed, foreign key |
| `workout_id`      | integer   | not null, indexed, foreign key |
| `body`            | text      | not null                       |             
| `created_at`      | datetime  | not null                       |
| `updated_at`      | datetime  | not null                       |

+ `author_id` references `users`  
+ `workout_id` references `workouts`
