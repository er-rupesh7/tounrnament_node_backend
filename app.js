const db = require('./src/system');
const mysql = require("mysql2");
const pool = mysql.createPool({
    host: db.db_host,
    user: db.db_username,
    password: db.db_pwd,
    database: db.db_name,
    connectionLimit: 10, // Adjust the limit as per your requirements
});

pool.query('SELECT * FROM users where username="champion"', (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }
    console.log('Query results:', results);
});

// Handle errors
pool.on('error', (err) => {
    console.error('MySQL Pool Error:', err);
});

// Close the pool gracefully when your application exits
process.on('SIGINT', () => {
    pool.end((err) => {
        if (err) {
            console.error('Error closing MySQL Pool:', err);
        }
        process.exit(0);
    });
});


// console.log(db)