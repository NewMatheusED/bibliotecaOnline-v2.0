import axios from 'axios';

export default async function handler(req, res) {
    try {
        const key = process.env.GOOGLE_BOOKS_API_KEY;
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=Javascript&key=${key}`);
        const books = response.data.items;
        res.status(200).json(books);
    } catch (error) {
        console.error('Failed to fetch books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
}