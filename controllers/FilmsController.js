/**
 * Author : Suresh Kumar 
 * Dated : 07 Aug-2022
 * Description: Controller handling all the  functionality related to films
 */
const ModelFilms        = require('../models/ModelFilms');
const ModelFilmGenre    = require('../models/ModelFilmGenre');
const ModelGenre        = require('../models/ModelGenre')
const Joi               = require('joi');  
const filmValidation    =  Joi.compile({
    name            :  Joi.required(),
    photo           :  Joi.required(),
    description     :  Joi.required(),
    ratings         :  Joi.required(),
    country         :  Joi.required(),
    genre           :  Joi.required(),
    release_date    :  Joi.required()
});

class FilmsController {
    constructor() {
        this.model              = new ModelFilms();
        this.film_genre_model   = new ModelFilmGenre();
        this.film_model         = new ModelGenre();
       }
     
    /**
    * Description : Get all Films record
    * @param {*} req 
    * @param {*} res 
    * @param {*} next 
    */
    async getAll(req,res,next){
        try{
            let filmObject = await this.model.getPaginatedRecord(req)
            let genre = await this.film_model.getAll();
            for(let film of filmObject.data ){
                film.genre = await this.film_genre_model.getFilmsGenre(film.id);
            }
            res.render('films',{pagination:filmObject,genre:genre})
        
        }catch(ex){
            console.log("Exception",ex)
            res.redirect('/404');
            
        }
        
    }
    /**
     * Description: Get fim detail by slug 
     * @param {*} reql(film name) 
     * @param {*} res 
     * @param {*} next 
     */
    async getFilmBySlug(req,res,next){
        try{
            let slug = req.params.film_slug;
            slug = slug.replace(/[:]+/g, '');
            let filmObject = await this.model.GetBySlug(slug);
            for(let film of filmObject ){
                film.genre = await this.film_genre_model.getFilmsGenre(film.id);
            }
            res.render('film_detail',{code:200, status:true ,data:filmObject})
        }catch(ex){
            console.log("Exception",ex)
            res.redirect('/404');
        }

    }   
    async addNewFilm(req,res,next){
        try{
            let genre = await this.film_model.getAll();
            res.render('create_film',{genre:genre})
        }catch(ex){
            console.log("Exception",ex)
            res.redirect('/404');
            
        }
    }
    async create(req,res,next){
        try{
            let valid = Joi.validate(req.body, filmValidation);
            if (valid.error){
                const { details } = valid.error; 
                const message = details.map(i => i.message).join(',');
                return res.status(424).json(message);
            }
            let insertObject = {
                name            : req.body.name,
                description     : req.body.description,
                ratings         : req.body.ratings,
                country         : req.body.country,
                release_date    : req.body.release_date,
                photo           : req.file.filename
            }
            let insert = await this.model.Create(insertObject);
            if(req.body.genre){
                for(let film_cat  of req.body.genre){
                    await this.film_genre_model.Create({genre_id: film_cat, film_id : insert[0]});
                }
            }
            res.redirect('../films');
        }catch(ex){
            console.log("Exception",ex);
            res.redirect('/404');
        }
    }
}
module.exports = FilmsController;
