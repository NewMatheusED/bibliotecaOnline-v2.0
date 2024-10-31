// app/lib/db.js

import { Pool } from 'pg';

let conn;

if (!conn) {
    conn = new Pool({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT  ,
        ssl: {
            rejectUnauthorized: false
        } 
    });
}

export { conn };