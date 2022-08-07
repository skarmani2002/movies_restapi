/**
 * Author : Suresh Kumar 
 * Dated : 07 Aug-2022
 * Description: Controller handling all the  functionality related to films
 */
const ModelFilms        = require('../models/ModelFilms');
const ModelFilmGenre    = require('../models/ModelFilmGenre');
const ModelGenre        = require('../models/ModelGenre')
class FilmsController {
    constructor() {
        this.model              = new ModelFilms();
        this.film_genre_model   = new ModelFilmGenre();
        this.film_model         = new ModelGenre();
       }
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
    async getFilmBySlug(req,res,next){
        try{
            let slug = req.params.film_slug;
            let filmObject = await this.model.GetBySlug(slug);
            for(let film of filmObject ){
                film.genre = await this.film_genre_model.getFilmsGenre(film.id);
            }
            res.render('film_detail',{code:200, status:true ,data:filmObject})
            console.log(filmObject)
        }catch(ex){
            console.log("Exception",ex)
            res.redirect('/404');
        }

    }   
    async create(req,res,next){
        try{
            console.log("HELO",req.body,req.file.filename)
        }catch(ex){
            console.log("Exception",ex)
        }
    }
}
module.exports = FilmsController;
