import { getUserById } from '../../lib/queries';

export default async function handler(req, res) {
    const { id } = req.query;
    const user = await getUserById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
}