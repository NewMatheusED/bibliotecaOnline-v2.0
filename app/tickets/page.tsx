'use client';

import { useState, useEffect } from 'react';
import DefaultLayout from '@/app/layout/DefaultLayout';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useAuth } from '@/app/context/authContext';
import Link from 'next/link';

export default function Tickets() {
    interface Ticket {
      id: string;
      userId: string;
      title: string;
    }

    const { user } = useAuth();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchTickets() {
      const response = await fetch('/api/tickets');
      const data = await response.json();
      setTickets(data);
    }
    fetchTickets();
  }, []);

  const handleCreateTicket = async () => {
    const title = prompt('Enter ticket title:');
    if (title && user) {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify({ userId: user.id, title }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newTicket = await response.json();
      setTickets([...tickets, newTicket]);
    }
  };

  return (
    <ProtectedRoute>
      <DefaultLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} loading={false}>
        <div className="title flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-black dark:text-white">Tickets</h1>
          <button onClick={handleCreateTicket} className="bg-primary text-white p-2 rounded">Create Ticket</button>
        </div>
        <ul>
          { Array.isArray(tickets) ? tickets.map(ticket => (
            <li key={ticket.id}>
              <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
            </li>
          )) : null }
        </ul>
      </DefaultLayout>
    </ProtectedRoute>
  );
}