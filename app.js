const db = require('./src/system');
const mysql = require("mysql2");
const express = require("express");
const port = process.env.PORT || 3000;

const app = express();

const pool = mysql.createPool({
    host: db.db_host,
    user: db.db_username,
    password: db.db_pwd,
    database: db.db_name,
    connectionLimit: 10,
});

// Handle errors
pool.on('error', (err) => {
    console.error('MySQL Pool Error:', err);
});

pool.query('SELECT * FROM users', (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }
    
    // Move your Express route handling code here
    app.get('/', (req, res) => {
        res.send(results); // Send the results as the response
    });
    
    app.listen(port, () => {
        console.log('Server is running on port: '+port);
    });
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
