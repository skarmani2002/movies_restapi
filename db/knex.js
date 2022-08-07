require('dotenv').config();
const knex = require('knex');
const debug = require('../libs/debug')('knex:config');

const environment = process.env.NODE_ENV || 'development';
debug('using environment: %s', environment);

const config = require('./knexfile')[environment];
debug('knex config: %o', config);

const DBknex	= knex(config);

const times = { };
let count = 0;

DBknex.on('query', (query) => {
    const uid = query.__knexQueryUid;
    times[uid] = {
      position: count,
      query,
     // startTime: now(),
      // I keep track of when a query is finished with a boolean instead of 
      // presence of an end time. It makes the logic easier to read.
     // finished: false,
    };
    count = count + 1;
}) 
.on('query-response', (response, query) => {
   
  
});

module.exports = DBknex;
