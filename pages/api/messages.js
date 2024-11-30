import { createMessage, getMessages } from '../../lib/queries';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { ticketId, senderId, content } = req.body;
    try {
      const message = await createMessage(ticketId, senderId, content);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message, error', error });
    }
  } else if (req.method === 'GET') {
    const { ticketId } = req.query;
    try {
      const messages = await getMessages(ticketId);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages, error', error });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}