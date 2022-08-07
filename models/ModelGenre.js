class ModelGenre {

    constructor() {
        this.table = 'genre';
        this.knex = global.knex;
    }

    async Get(where) {
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
    async getAll() {
        return this.knex(this.table).select();
    }
   
   
}
module.exports = ModelGenre;