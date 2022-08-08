class ModelUsers {

    constructor() {
        this.table = 'users';
        this.knex = global.knex;
    }

    async Get(where) {
        let users =  await this.knex(this.table).select().where(where);
        return users && users.length > 0 ? users[0] : null;
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
module.exports = ModelUsers;