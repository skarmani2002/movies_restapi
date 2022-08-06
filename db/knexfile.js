/**
 *  Author : Suresh Kumar
 *  Database connectivity base on env.
 */
const knexConfig = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'movies',
            port:3306
        },
        migrations: {
            directory: __dirname + '/migrations',
        },
        seeds: {
            directory: __dirname + '/seeds',
        },
    },
   
    test: {
        client: 'mysql',
        debug: false,
        migrations: {
            directory: __dirname + '/migrations',
        },
        seeds: {
            directory: __dirname + '/seeds',
        },
    },
   
    qa: {
       
    },
    production: {
        
    }
};

// override the database connection string
if (process.env.DATABASE_URL && process.env.NODE_ENV && {}.hasOwnProperty.call(knexConfig, process.env.NODE_ENV)) {
    knexConfig[process.env.NODE_ENV].connection = process.env.DATABASE_URL;
}

module.exports = knexConfig;
