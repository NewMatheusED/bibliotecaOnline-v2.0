import { registerUser } from "../../lib/queries";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed, please use POST' });
    }
    const { name, email, password } = req.body;
    const registrar = await registerUser(name, email, password);
    res.status(200).json(registrar);
}