# React-Mongo-MusicSongLyrics

Using Node Express to host For users to search songs, enjoy watching music videos, and sing along with lyrics. Users are be able to sign up and log in using their usernames and passwords. Users can manage their songs by adding/deleting songs to/from Favorites. Users can create and manage playlists as well.

![MusicSongLyrics logged in photo](photo/logedin.png)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
* Install [nodejs](https://nodejs.org/en/) for backend server.
* Install [MongoDB](https://www.mongodb.com/) for database. 
* Get API keys from 
    * [YouTube](https://developers.google.com/youtube/v3/) to search for music videos
    * [Apiseeds](https://apiseeds.com/documentation/lyrics) to search for lyrics

After finish setting up the above, clone this project to your local machine and we can go to the next step.

### Installing
`cd React-Mongo-MusicSongLyrics` and run the command below to install everything for the server.
```
npm install
```
Then run the command below to change directory to client and install React project for front end.
```
install
```

### Database Set Up
Use Mongodb, and Mongoose to access database
* User schema
    * name - user name, must be unique
    * password_hash - password length must greater than 5, use `bcrypt` to generate hash
    * favorites - collection of songs from Song as reference 
    * playlists - collection of playlists from Playlist as reference
* Playlist schema
    * name - playlist name
    * songs - collection of songs from Song as reference
* Song schema
    * name - song name
    * artist - artist name
    * thumbnail - thumbnail picture url
    * video - YouTube video url
    * lyrics

The database grows as more users sign up, playlists get created, and songs get searched and added.

### Running the tests
To run a local testing server, go to the root directory of this project and run this command in your terminal:
```
node server
```
Now the local server is running on port 3001 in your local machine.

`cd client` to React project directory and run this in your terminal:
```
yarn start
```
React is running on port 3000. Open your browser and visit http://localhost:3000.

### Usage Example
* This is a single page application that uses `react-router-dom` to navigate, hide and show React components without changing routes within Express.
* Users have to sign up to create accounts in order to log in and search songs and lyrics.
* Create jwt token and stored in local storage when users log in.

<p align="center">
  <img width="500" height="284" src="./photo/cover.png" alt="MusicSongLyrics Cover page">
</p>

<p align="center">
  <img width="500" height="284" src="./photo/signup.png" alt="MusicSongLyrics sign up page">
</p>

<p align="center">
  <img width="500" height="284" src="./photo/login.png" alt="MusicSongLyrics login page">
</p>

After user logs in 
* Client side:
    * user is able to search songs and lyrics by pairing artist and song names
    * add current song to Favorite or existing playlists
    * select playlist to see collections
    * create new playlists
* Server side:
    * verify jwt token and decode token to get username as middleware 
    * interact with database based on requests made

<p align="center">
  <img width="500" height="284" src="./photo/addToPlaylist.png" alt="MusicSongLyrics add to playlist">
</p>

<p align="center">
  <img width="500" height="284" src="./photo/selectPlaylist.png" alt="MusicSongLyrics select playlist">
</p>

<p align="center">
  <img width="500" height="284" src="./photo/favorite.png" alt="MusicSongLyrics Favorites">
</p>

* when user logs out, jwt token that stored in local storage destroys.

<p align="center">
  <img width="500" height="284" src="./photo/logout.png" alt="MusicSongLyrics logged out">
</p>

## Deployed to Heroku
Check out this project here: https://react-mongo-musicsonglyrics.herokuapp.com/

## Meta

Huiling Wu 
* huwu@ucdavis.edu
* https://github.com/huwu55
* https://www.linkedin.com/in/huwu55/

## Acknowledgments

This project has an old version which it doesn't have a server and uses Firebase to store data. 
Check out the old version here: https://github.com/huwu55/MusicSongLyrics.