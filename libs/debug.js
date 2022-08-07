const debug = require('debug');

module.exports = (n) => {
    return debug(`movies:v1:${n}`);
};
