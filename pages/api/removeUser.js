import { removeUser } from '../../lib/queries';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            const { id } = req.query;
            const user = await removeUser(id);
            res.status(200).json(user);
        } catch {
            res.status(500).json({ error: 'Failed to remove user API error' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}