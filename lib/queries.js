import { conn } from './db';

export async function getUsers() {
    const res = await conn.query('SELECT * FROM "Users"');
    return res.rows;
}

export async function getUserById(id) {
    const res = await conn.query('SELECT * FROM "Users" WHERE id = $1', [id]);
    return res.rows[0];
}