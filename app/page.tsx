'use client';

import React, { useState, useEffect } from 'react';
import DefaultLayout from '@/app/layout/DefaultLayout';
import BookSingle from './components/BookSingle';
import withAuth from '@/hoc/withAuth';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

function Home() {
  // const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // async function getUsers() {
  //   try {
  //     const response = await fetch('/api/getUsers');
  //     const data = await response.json();
  //     setUsers(data);
  //   } catch (error) {
  //     console.error('Erro ao buscar usuários:', error);
  //   }
  // }

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/api/getBooks');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return (
    <DefaultLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} loading={loading}>
      <div className='flex gap-4 flex-wrap'>
        {books.map((book) => (
          <BookSingle
            key={book.id}
            title={book.volumeInfo.title}
            image={book.volumeInfo.imageLinks.thumbnail}
            description={book.volumeInfo.description}
          />
        ))}
      </div>
    </DefaultLayout>
  );
}

export default withAuth(Home);