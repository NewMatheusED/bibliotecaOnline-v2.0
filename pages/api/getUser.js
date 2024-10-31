import { getUserById } from '../../lib/queries';

export default async function handler(req, res) {
    const { id } = req.query;
    const user = await getUserById(id);
    res.status(200).json(user);
}