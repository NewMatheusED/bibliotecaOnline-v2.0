import { registerUser, analiseEmail } from '../../lib/queries';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;
        try {
            const userExists = await analiseEmail(email);
            if (userExists) {
                res.status(400).json({ error: 'Email already registered' });
                return;
            }
            const user = await registerUser(name, email, password);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to register user, erro' + error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}