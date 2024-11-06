import { conn } from './db';
import { hashPassword } from './auth';

export async function getUsers() {
    const res = await conn.query('SELECT * FROM "Users"');
    return res.rows;
}

export async function getUserById(id) {
    const res = await conn.query('SELECT * FROM "Users" WHERE id = $1', [id]);
    return res.rows[0];
}

export async function registerUser(name, email, password) {
    const hashedPassword = await hashPassword(password);
    const res = await conn.query('INSERT INTO "Users" (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, hashedPassword, 'user']);
    return res.rows[0];
  }

export async function analiseEmail(email) {
    const res = await conn.query('SELECT * FROM "Users" WHERE email = $1', [email]);
    return res.rows[0];
}