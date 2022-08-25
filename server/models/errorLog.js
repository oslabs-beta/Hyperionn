const { Pool } = require('pg');
const PG_URI = 'postgres://dcdctlxp:Vjjyr-AwlQwjVcU0XHtIaPHnbKU2HiLh@queenie.db.elephantsql.com/dcdctlxp'

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('QUERY: ', text);
    return pool.query(text, params, callback);
  },
};