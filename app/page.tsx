'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface User {
  id: number;
  name: string;
  email: string;
}

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

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState([]);

  async function getUsers() {
    try {
      const response = await fetch('/api/getUsers');
      const data = await response.json();
      setUsers(data);
    }
    catch {
      console.error('Erro ao buscar')
    }
  }

  async function getBooks() {
    try {
      const response = await fetch('/api/getBooks');
      const data = await response.json();
      setBooks(data);
    }
    catch {
      console.error('Erro ao buscar os livros')
    }
  }

  return (
    <div>
      <h1>Home</h1>
      <button className="bg-zinc-600 text-zinc-50" onClick={getUsers}>Get Users</button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-zinc-600 text-zinc-50" onClick={getBooks}>Get Books</button>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Editora</th>
            <th>Data de Publicação</th>
            <th>Descrição</th>
            <th>Imagem</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book: Book) => (
            <tr key={book.id}>
              <td>{book.volumeInfo.title}</td>
              <td>{book.volumeInfo.authors.join(', ')}</td>
              <td>{book.volumeInfo.publisher}</td>
              <td>{book.volumeInfo.publishedDate}</td>
              <td><Image src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} width={50} height={75} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}