'use client';

import { useState, useEffect } from 'react';
import DefaultLayout from '@/app/layout/DefaultLayout';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useAuth } from '@/app/context/authContext';
import { useRouter } from 'next/router';

export default function Ticket() {

    interface Message {
        id: string;
        ticketId: string;
        senderId: string;
        content: string;
    }

  const { user } = useAuth();
  const router = useRouter();
  const { ticketId } = router.query;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch(`/api/messages?ticketId=${ticketId}`);
      const data = await response.json();
      setMessages(data);
    }
    fetchMessages();
  }, [ticketId]);

  const handleSendMessage = async () => {
    if (user) {
        const response = await fetch('/api/messages', {
          method: 'POST',
          body: JSON.stringify({ ticketId, senderId: user.id, content: newMessage }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const message = await response.json();
        setMessages([...messages, message]);
        setNewMessage('');
    }
  };

  return (
    <ProtectedRoute>
      <DefaultLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} loading={false}>
        <div className="title flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-black dark:text-white">Ticket #{ticketId}</h1>
        </div>
        <div className="messages">
          {user && messages.map(message => (
            <div key={message.id} className={`message ${message.senderId === user.id ? 'sent' : 'received'}`}>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
        <div className="new-message">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
}