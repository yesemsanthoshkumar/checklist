const { Pool } = require('pg');
const pool = new Pool({
    'connectionString': 'postgresql://yesemsanthoshkumar:password@127.0.0.1:5432/Checklist'
});

module.exports = {
    'client': pool
};
