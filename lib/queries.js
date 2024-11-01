import { conn } from './db';

export async function getUsers() {
    const res = await conn.query('SELECT * FROM "Users"');
    return res.rows;
}

export async function getUserById(id) {
    const res = await conn.query('SELECT * FROM "Users" WHERE id = $1', [id]);
    return res.rows[0];
}

export async function registerUser(name, email, password) {
    await conn.query('INSERT INTO "Users" (name, email, password) VALUES ($1, $2) RETURNING *', [name, email, password]);
    return 'User registered successfully';
}