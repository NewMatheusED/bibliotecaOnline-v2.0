import { updateUser } from '../../lib/queries';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { userId, name, email } = req.body;
        try {
            const updatedUser = await updateUser(userId, name, email);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user: ' + error.message });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}