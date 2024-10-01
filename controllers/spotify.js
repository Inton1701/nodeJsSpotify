const multer = require('multer');
const path = require('path');
const fs = require('fs');
const isputiplay = require('../models/isputiplay');
const mm = require('music-metadata');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'banner') {
      cb(null, 'public/images'); 
    } else if (file.fieldname === 'songFile') {
      cb(null, 'public/songs'); 
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

const spotify = {
  index: (req, res) => {
    res.render('index');
  },
  musicBanner: (req, res) => {
    res.render('musicBanner');
  },
  mySongs: (req, res) => {
    isputiplay.getAllSong((err, results) => {
      if (err) throw err;
      res.render('mySongs', {data:results})
    });
  },
  favourites: (req, res) => {
    isputiplay.getAllFavourite((err, results) => {
      if (err) throw err;
      res.render('favourites', {data:results})
    });

  },

  addSong: (req, res) => {
    upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'songFile', maxCount: 1 }])(req, res, (err) => {
      if (err) {
        return res.status(500).send('File upload failed');
      }

      const { artist, genre, year } = req.body;
      const bannerPath = req.files['banner'] ? req.files['banner'][0].path.replace(/\\/g, '/') : null;
      const songFile = req.files['songFile'][0];
      const songPath = songFile.path.replace(/\\/g, '/');
      const title = path.basename(songFile.originalname, path.extname(songFile.originalname));
      const songData = {
        title,
        artist,
        bannerPath,
        genre,
        songPath,
        year,

      };
      isputiplay.createSong(songData, (err) => {
        if (err) throw err;
        res.redirect('/mySongs'); 
      });
    });
  },
  deleteSong: (req, res) => {
    const id = req.params.id;
    isputiplay.deleteSong(id, (err) => {
      if (err) throw err;
      res.redirect('/mySongs');
    });
  },
  addFavourites:(req, res) => {
    const songId  = req.params.id;
    isputiplay.addFavourite(songId, (err) => {
      if (err) alert('Already in Favouites');
      res.redirect('/mySongs');
    });
  },
  deleteFavourites: (req, res) => {
    const id = req.params.id;
    isputiplay.deleteFavourites(id, (err) => {
      if (err) throw err;
      res.redirect('/favourites');
    });
  },
  searchSong:(req, res) => {
    const key = req.query.key
    isputiplay.searchSong(key, (err, results) => {
      if (err) throw err;
      res.render('mySongs', {data: results})
    });

  }
};

module.exports = spotify;
