const express = require('express');
const router = express.Router();
const spotify = require('../controllers/spotify');

router.get('/', spotify.index);
router.get('/musicBanner', spotify.musicBanner);
router.get('/mySongs', spotify.mySongs);
router.get('/favourites', spotify.favourites);
router.post('/addSong', spotify.addSong);
router.get('/deleteSong/:id', spotify.deleteSong);
router.get('/addFavourites/:id', spotify.addFavourites);
router.get('/deleteFavourites/:id', spotify.deleteFavourites);
router.get('/mySong', spotify.searchSong);


module.exports = router