import { conn } from './db';
import { hashPassword, verifyPassword } from './auth';

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
    const defaultProfilePictureUrl = 'https://profilepicturesbibliotecabucket.s3.sa-east-1.amazonaws.com/uploads/default-profile.png';
    const res = await conn.query(
        'INSERT INTO "Users" (name, email, password, role, "profilePicture") VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, hashedPassword, 'user', defaultProfilePictureUrl]
    );
    return res.rows[0];
}

export async function loginUser(email, password) {
    const res = await conn.query('SELECT * FROM "Users" WHERE email = $1', [email]);
    const user = res.rows[0];
    if (!user) {
        return null;
    }
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
        return null;
    }
    return user;
}

export async function analiseEmail(email) {
    const res = await conn.query('SELECT * FROM "Users" WHERE email = $1', [email]);
    return res.rows[0];
}

export async function updateUser(id, name, email, profilePicture) {
    const res = await conn.query('UPDATE "Users" SET name = $1, email = $2, "profilePicture" = $3 WHERE id = $4 RETURNING *', [name, email, profilePicture, id]);
    return res.rows[0];
}