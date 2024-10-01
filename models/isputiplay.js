const db = require('../config/database');
const isp ={
    //Songs
    createSong:(songData, callback) => {
        const query = `INSERT INTO songs (title, artist,banner, genre,  song_path, released_date) VALUES (?, ?, ?, ?, ?, ?)`;
        const {title, artist ,bannerPath, genre, songPath, year, } = songData;
        db.execute(query, [title, artist, bannerPath, genre,  songPath,year], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    getAllSong:(callback) =>{
        const query = ("SELECT * FROM songs")
        db.query(query,callback);
    },
    deleteSong:(id, callback) => {
        const query = "DELETE FROM songs WHERE song_id =?";
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    getAllFavourite:(callback) =>{
        const query = ("SELECT * FROM user_favorites INNER JOIN songs WHERE user_favorites.song_id = songs.song_id")
        db.query(query,callback);
    },
    addFavourite:(id, callback) => { 
        const query = "INSERT INTO user_favorites (song_id) VALUES (?)";
        db.query(query, [id], (err, results) => {
        
            callback(null, results);
        });
    },
    deleteFavourites:(id, callback) => {
        const query = "DELETE FROM user_favorites WHERE song_id =?";
        db.query(query, [id], callback);
    },
    searchSong:(key, callback) => {
        const query = "SELECT * FROM songs WHERE title LIKE ? OR artist LIKE ? OR genre LIKE ? OR released_date LIKE ?"
        db.query(query, [`%${key}%`, `%${key}%`, `%${key}%`, `%${key}%`], callback);
    }
}

  
module.exports = isp;