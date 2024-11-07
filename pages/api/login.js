import { loginUser } from "../../lib/queries";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        try {
            const user = await loginUser(email, password);
            if (!user) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }
            res.status(200).json(user);
        } catch (erro) {
            res.status(500).json({ error: 'Failed to login user: ' + erro });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}