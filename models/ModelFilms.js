class ModelFilms {

    constructor() {
        this.table = 'films';
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
    async GetBySlug(slug) {
        return this.knex(this.table).select()
        .where('name', 'like', `%${slug}%`);
    }
   
    async getPaginatedRecord(req){
        let reqData = req.query;
        let pagination = {};
        let  per_page = reqData.per_page || 1;
        let page = reqData.p || 1;
        if (page < 1) page = 1;
        var offset = (page - 1) * per_page;
        return Promise.all([
            knex.count('* as count').from("films").first(),
            knex.select("*")
            .from("films")
            .offset(offset).limit(per_page)
        ]).then(([total, rows]) => {
            var count = total.count;
            var rows = rows;
            pagination.pageCount = count;
            pagination.per_page = per_page;
            pagination.offset = offset;
            pagination.to = offset + rows.length;
            pagination.last_page = Math.ceil(count / per_page);
            pagination.page = page;
            pagination.from = offset;
            pagination.data = rows;
            
            return pagination;
            
        });
    }
   
}
module.exports = ModelFilms;