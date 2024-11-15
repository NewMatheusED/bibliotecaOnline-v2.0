'use client';

import React, { useState, useEffect } from 'react';
import DefaultLayout from '@/app/layout/DefaultLayout';
import BookSingle from './components/BookSingle';
import ProtectedRoute from './components/ProtectedRoute';
import defaultThumbnail from '@/app/ui/images/default_image.png';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    imageLinks?: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
}

function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/api/getBooks');
        const data = await response.json();
        setBooks(data);
        console.log(data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return (
    <ProtectedRoute>
      <DefaultLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} loading={loading}>
        <div className='flex gap-4 flex-wrap'>
          {books.map((book) => (
            <BookSingle
              key={book.id}
              title={book.volumeInfo.title}
              image={book.volumeInfo.imageLinks?.smallThumbnail || defaultThumbnail.src}
            />
          ))}
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
}

export default Home;