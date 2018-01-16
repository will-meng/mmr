<h1 align="center">MyMap.Run</h1>

<p align="center">
  <a href='http://www.mymap.run'><img src='http://www.roadtoepic.com/wp-content/uploads/2012/05/RunKeeper-Logo1.jpg'/></a>
</p>
<p align="center">Create running routes and log your workouts.</p>
<p align="center">Built with React and Redux by William Meng</p>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Future Work](#future-work)

## Introduction

A community where members create and share running routes, workouts, and good vibes. 

MyMap.Run is the official unofficial clone of [MapMyRun](http://www.mapmyrun.com).

<p align="center">
<img src='https://s3-us-west-1.amazonaws.com/mymaprun-pro/readme/dashboard.png' height='400px'>
</p>

## Features

- User accounts and profiles
- Interactive route creation via integration with Google Maps
- Workout logging with detailed stats
- Community of runners including friend search
- Comment and compare workouts with your friends'

<p align="center"><img src='https://s3-us-west-1.amazonaws.com/mymaprun-pro/readme/route.png' width='400px'></p>

- Users can add up to 20 waypoint markers on the map
- Waypoint markers are all draggable and will dynamically update the route
- Clicking a waypoint marker deletes the waypoint
- Convenient toolbox gives users the ability to undo their last waypoint, clear the map, return to their starting point, or intelligently center the map around their route waypoints
 
<p align="center"><img src='https://s3-us-west-1.amazonaws.com/mymaprun-pro/readme/workout.png' width='400px'></p>

- Workout pages calculate detailed stats about distance, duration, steps, and pace
- Users can view and comment on their friends' workouts

<p align="center"><img src='https://s3-us-west-1.amazonaws.com/mymaprun-pro/readme/friends.png' width='300px'></p>

## Technologies

### Frontend

- Redux (Flux) to manage a single global state using actions and reducers
- React components efficiently handle rendering and data pipeline
- React Router provides seemless single page application (SPA) experience
- Babel transpiler
- jQuery handles AJAX requests to backend
- Node package manager (npm) handles dependencies
- Webpack minifies frontend assets
- SCSS organizes site styling

### Backend

- Ruby on Rails MVC framework that provides RESTful web service API
- ActiveRecord for SQL queries
- PostgresQL Database

### Dependencies

- Google Maps API including geometry and places libraries
- Amazon Web Services SDK for file storage on Amazon Simple Storage Service (S3)
- Paperclip and ImageMagick for image attachment
- BCrypt for password-salting, hashing, and secure authentication system

## Future Work

- Location search so users can easily center the map anywhere in the world
- Activity Feed to keep up to date with friends' recent activity
- Limit to number of results shown on single page, for faster loading
- Frontend redesign to achieve a more coherant style and theme
