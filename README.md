# React-Mongo-MusicSongLyrics

##Re-do MusicSongLyrics
Deployed to Heroku

###Project description
For users to search songs and enjoy watching music videos and singing along with lyrics. Users can add/delete songs to Favorites under their username.

APIs:
1. YouTube
1. API Seeds Lyrics

Old version:
1. https://huwu55.github.io/MusicSongLyrics/
1. user is able to create username only, if users have the same username, they will be getting into the same account
1. 1. use local storage for storing username
1. require to fill out both artist name and song name to search
1. use Firebase to store song info and playlists

New version:
1. have a backend server: node express
1. have database: Use Mongoose for MongoDB 
1. user is able to create account with username and password - jwt authentication
1. use React for front-end