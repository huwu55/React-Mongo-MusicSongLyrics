# React-Mongo-MusicSongLyrics

## Re-do MusicSongLyrics
Deployed to Heroku: https://react-mongo-musicsonglyrics.herokuapp.com/

### Project description
For users to search songs and enjoy watching music videos and singing along with lyrics. Users can add/delete songs to Favorites under their username.

APIs:
* YouTube
* API Seeds Lyrics

Old version:
* https://huwu55.github.io/MusicSongLyrics/
* user is able to create username only, if users have the same username, they will be getting into the same account
    * use local storage for storing username
* require to fill out both artist name and song name to search
* use Firebase to store song info and playlists

New version:
* https://react-mongo-musicsonglyrics.herokuapp.com/
* have a backend server: node express
* have database: Use Mongoose for MongoDB 
    * DB Collections: Users and Songs
* user is able to create account with username and password - jwt authentication
* use React for front-end
* future feature: allow users to create playlists
    * additional DB Collections: Playlist