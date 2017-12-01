# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# include ActionView::Helpers::AssetUrlHelper

cap = User.create(fname: 'Steve', lname: 'Rogers', email: 'captain.america@gmail.com',
  birthday: '2000/1/1', password: 'hunter12', img_url: 'https://s3-us-west-1.amazonaws.com/mymaprun-pro/users/images/captain-america.png')
cyc = User.create(fname: 'Scott', lname: 'Summers', email: 'cyclops@gmail.com',
  birthday: '2000/1/1', password: 'hunter12', img_url: 'https://s3-us-west-1.amazonaws.com/mymaprun-pro/users/images/cyclops.png')
dare = User.create(fname: 'Matt', lname: 'Murlock', email: 'daredevil@gmail.com',
  birthday: '2000/1/1', password: 'hunter12', img_url: 'https://s3-us-west-1.amazonaws.com/mymaprun-pro/users/images/daredevil.jpeg')
dp = User.create(fname: 'Wade', lname: 'Wilson', email: 'deadpool@gmail.com',
  birthday: '2000/1/1', password: 'hunter12', img_url: 'https://s3-us-west-1.amazonaws.com/mymaprun-pro/users/images/deadpool.png')
drs = User.create(fname: 'Stephen', lname: 'Strange', email: 'doctorstrange@gmail.com',
  birthday: '2000/1/1', password: 'hunter12', img_url: 'https://s3-us-west-1.amazonaws.com/mymaprun-pro/users/images/dr-strange.png')
gambit = User.create(fname: 'Remy', lname: 'LeBeau', email: 'gambit@gmail.com',
  birthday: '2000/1/1', password: 'hunter12', img_url: 'https://s3-us-west-1.amazonaws.com/mymaprun-pro/users/images/gambit.png')
hulk = User.create(fname: 'Bruce', lname: 'Banner', email: 'hulk@gmail.com',
  birthday: '2000/1/1', password: 'hunter12', img_url: 'https://s3-us-west-1.amazonaws.com/mymaprun-pro/users/images/hulk.png')
im = User.create(fname: 'Tony', lname: 'Stark', email: 'ironman@gmail.com',
  birthday: '2000/1/1', password: 'hunter12', img_url: 'https://s3-us-west-1.amazonaws.com/mymaprun-pro/users/images/iron-man.png')
prof = User.create(fname: 'Charles', lname: 'Xavier', email: 'professorx@gmail.com',
  birthday: '2000/1/1', password: 'hunter12', img_url: 'https://s3-us-west-1.amazonaws.com/mymaprun-pro/users/images/professor-x.jpeg')
psy = User.create(fname: 'Betsy', lname: 'Braddock', email: 'psylocke@gmail.com',
  birthday: '2000/1/1', password: 'hunter12', img_url: 'https://s3-us-west-1.amazonaws.com/mymaprun-pro/users/images/psylocke.jpeg')
rog = User.create(fname: 'Anna', lname: 'Marie', email: 'rogue@gmail.com',
  birthday: '2000/1/1', password: 'hunter12', img_url: 'https://s3-us-west-1.amazonaws.com/mymaprun-pro/users/images/rogue.gif')
sm = User.create(fname: 'Peter', lname: 'Parker', email: 'spiderman@gmail.com',
  birthday: '2000/1/1', password: 'hunter12', img_url: 'https://s3-us-west-1.amazonaws.com/mymaprun-pro/users/images/spider-man.png')
storm = User.create(fname: 'Ororo', lname: 'Munroe', email: 'storm@gmail.com',
  birthday: '2000/1/1', password: 'hunter12', img_url: 'https://s3-us-west-1.amazonaws.com/mymaprun-pro/users/images/storm.jpeg')
thor = User.create(fname: 'Thor', lname: 'Odinson', email: 'thor@gmail.com',
  birthday: '2000/1/1', password: 'hunter12', img_url: 'https://s3-us-west-1.amazonaws.com/mymaprun-pro/users/images/thor.jpeg')
wolv = User.create(fname: 'James', lname: 'Howlett', email: 'wolverine@gmail.com',
  birthday: '2000/1/1', password: 'hunter12', img_url: 'https://s3-us-west-1.amazonaws.com/mymaprun-pro/users/images/wolverine.jpeg')

f1 = Friendship.create(requestor_id: cap.id, requestee_id: hulk.id, confirmed: true)
f2 = Friendship.create(requestor_id: cap.id, requestee_id: sm.id, confirmed: true)
f3 = Friendship.create(requestor_id: cap.id, requestee_id: thor.id, confirmed: true)
f4 = Friendship.create(requestor_id: cap.id, requestee_id: im.id, confirmed: true)
f5 = Friendship.create(requestor_id: cap.id, requestee_id: drs.id, confirmed: true)
f6 = Friendship.create(requestor_id: cap.id, requestee_id: cyc.id, confirmed: false)
f7 = Friendship.create(requestor_id: cap.id, requestee_id: wolv.id, confirmed: false)
f8 = Friendship.create(requestor_id: cap.id, requestee_id: storm.id, confirmed: false)
f9 = Friendship.create(requestor_id: cap.id, requestee_id: psy.id, confirmed: false)
f10 = Friendship.create(requestor_id: prof.id, requestee_id: cap.id, confirmed: false)
f11 = Friendship.create(requestor_id: dare.id, requestee_id: cap.id, confirmed: false)
f12 = Friendship.create(requestor_id: rog.id, requestee_id: cap.id, confirmed: false)