const express = require('express');
const router  = express.Router();
const FilmsController = require('../controllers/FilmsController');
const filmsController = new FilmsController();
const uploadPhoto = require('../middlewares/photo-upload');
const filmValidation = require('../validations/film');

router.get(
    '/films',
    filmsController.getAll.bind(filmsController));

router.get(
    '/films/:film_slug',
    filmsController.getFilmBySlug.bind(filmsController));

router.get(
    '/films/create',
    filmsController.addNewFilm.bind(filmsController));
    
    router.post(
    '/films/create',
    uploadPhoto('photo'),
   filmsController.create.bind(filmsController));

        
module.exports = router;
