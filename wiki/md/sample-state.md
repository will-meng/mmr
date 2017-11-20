# Sample State

```js
{
  entities: {
    workouts: {
      1: {
        id: 1,
        name: "Em after work",
        user_id: 11,
        date: 2017/10/31,
        description: "I was out of breathe the whole time :("
      	route_id: 1,
      	duration: 1258
      },
      2: {
        id: 2,
        name: "PH 4mi sprint",
        user_id: 42,
        date: 2017/11/8,
      	description: "EZ PZ"
      	route_id: 2,
      	duration: 1769,
      	comment_ids: [33, 64]
      }
    },
    routes: {
      1: {
        id: 1,
        name: "embarcadero loop",
        creator_id: 23,
      	description: "short easy loop from work"
      	distance: 2.67,
      	coordinates: [[lon1, lat1], [lon2, lat2], [lon3, lat3]] (unsure what the actual map data will look like)
      },
      2: {
        id: 2,
        name: "Potrero Hill out and back",
        creator_id: 23,
	      distance: 4.03
      }
    },
    users: {
      11: {
        id: 9,
        email: "worldchamp@gmail.com",
      	fname: "John",
      	lname: "Doe",
      	friend_ids: [23, 42],
        requested_ids: [],
        pending_ids: []
      	(age and gender only used for legal/analytics)
      },
      23: {
        id: 31,
        email: "sprintmaster@yahoo.com",
        img_url: "https://www.somesite.com/1234.jpg"
      	fname: "Jane",
      	lname: "Doe",
      	friend_ids: [11],
        requested_ids: [42],
        pending_ids: []
      },
      42: {
        id: 42,
        email: "slow1@hotmail.com",
        img_url: "https://www.somesite.com/12345.jpg"
      	fname: "Johnny",
      	lname: "Doe",
      	friend_ids: [11],
        requested_ids: [],
        pending_ids: [23]
      }
    },
    comments: {
      33: {
        id: 33,
        body: "Awesome job! Keep it up!",
      	author_id: 11,
      	workout_id: 2
      },
      64: {
        id: 64,
        body: "Thanks, I always try to stay ahead of you",
      	author_id: 42,
      	workout_id: 2
      }
    }
  },
  ui: {
    loading: true/false
  },
  errors: {
    login: ["Incorrect username/password combination"],
    workoutForm: ["Distance cannot be blank"]
  },
  session: {
    currentUser: {
      id: 42,
      fname: "Johnny",
      lname: "Doe",
      img_url: "https://www.somesite.com/12345.jpg"
    }
  }
}
```
