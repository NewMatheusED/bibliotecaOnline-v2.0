'use client';

import React, { useState, useEffect } from 'react';
import DefaultLayout from '@/app/layout/DefaultLayout';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import defaultThumbail from '@/public/images/default_image.png';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

export default function Book() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookData, setBookData] = useState<Book | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');
    async function fetchBookData() {
      try {
        const response = await fetch('/api/getBookInfo?id=' + bookId);
        const data = await response.json();
        console.log(data);
        setBookData(data);
      } catch (error) {
        console.error('Erro ao buscar livro:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookData();
  }, []);

  function goBack() {
    window.history.back();
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <DefaultLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} loading={loading}>
          <h1>Loading...</h1>
        </DefaultLayout>
      </ProtectedRoute>
    );
  }

  if (!bookData) {
    return (
      <ProtectedRoute>
        <DefaultLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} loading={loading}>
          <h1>Livro não encontrado</h1>
        </DefaultLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DefaultLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} loading={loading}>
        <div className="p-5">
            <div className="flex flex-col md:flex-row gap-5 items-center mb-4">
                <ChevronLeft onClick={goBack} className='hidden cursor-pointer hover:scale-110 md:block' />
                <h1 className="text-2xl font-bold text-center md:text-left">{bookData.volumeInfo.title}</h1>
            </div>
            {bookData.volumeInfo.subtitle && <h2 className="text-xl mb-4">{bookData.volumeInfo.subtitle}</h2>}
            <div className="flex flex-col md:flex-row gap-4">
                <Image
                src={bookData.volumeInfo.imageLinks?.thumbnail || defaultThumbail}
                alt={bookData.volumeInfo.title}
                width={200}
                height={300}
                className="rounded h-[300px] w-[200px] object-cover"
                />
                <div>
                <p><strong>Author:</strong> {bookData.volumeInfo.authors.join(', ')}</p>
                <p><strong>Publisher:</strong> {bookData.volumeInfo.publisher}</p>
                <p><strong>Published Date:</strong> {bookData.volumeInfo.publishedDate}</p>
                <p className="mt-4"><strong>Description:</strong></p>
                <div dangerouslySetInnerHTML={{ __html: bookData.volumeInfo.description }} />
                </div>
            </div>
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
}