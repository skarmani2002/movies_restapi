const express = require('express');
const router  = express.Router();
const FilmsController = require('../controllers/FilmsController');
const filmsController = new FilmsController();
const uploadPhoto = require('../middlewares/photo-upload');
const filmValidation = require('../validations/film').default;

router.get(
    '/films',
    filmsController.getAll.bind(filmsController));

router.get(
    '/films/:film_slug',
    filmsController.getFilmBySlug.bind(filmsController));

router.post(
    '/films/create',
    filmValidation,
    uploadPhoto('photo'),
    filmsController.create.bind(filmsController));

        
module.exports = router;
