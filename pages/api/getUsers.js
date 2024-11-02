// app/api/getUsers.js

import { getUsers } from '../../lib/queries';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const users = await getUsers();
            res.status(200).json(users);
        } catch {
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}