class ModelFilmGenre {

    constructor() {
        this.table = 'film_genre';
        this.knex = global.knex;
    }

    Get(where) {
        return this.knex(this.table).select().where(where);
    }

    async Create(data) {
        return this.knex(this.table).returning('id').insert(data);
    }

    Update(data, where) {
        return this.knex(this.table).update(data).where(where);
    }

    Remove(where) {
        return this.knex(this.table).where(where).delete();
    }
    async getFilmsGenre(filmId){
        let genre_query = await knex.raw('SELECT group_concat(genre.name) as genre_name from genre INNER JOIN film_genre ON film_genre.genre_id=genre.id inner join films on films.id= film_genre.film_id WHERE films.id='+filmId);
        return genre_query[0][0].genre_name;
    }
   
}
module.exports = ModelFilmGenre;