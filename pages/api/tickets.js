import { createTicket, getTickets } from '../../lib/queries';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, title } = req.body;
    try {
      const ticket = await createTicket(userId, title);
      res.status(200).json(ticket);
    } catch (error) {
        console.log('deu bomba, ', error)
      res.status(500).json({ error: 'Failed to create ticket, error', error });
    }
  } else if (req.method === 'GET') {
    try {
      const tickets = await getTickets();
      res.status(200).json(tickets);
    } catch (error) {
        console.log('deu bomba dnv em, ', error)
      res.status(500).json({ error: 'Failed to fetch tickets, error ', error });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}