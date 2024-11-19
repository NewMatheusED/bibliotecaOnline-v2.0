import axios from 'axios';

export default async function handler(req, res) {
    const { id } = req.query;
    try {
        const key = process.env.GOOGLE_BOOKS_API_KEY;
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${key}`);
        const book = response.data;
        res.status(200).json(book);
    }
    catch (error) {
        console.error('Failed to fetch book:', error);
        res.status(500).json({ error: 'Failed to fetch book' });
    }
}