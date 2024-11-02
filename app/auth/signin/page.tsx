'use client';

import { useState } from 'react';
import DefaultLayout from '@/app/layout/DefaultLayout'

export default function Signin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DefaultLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} loading={false}>
      <h1>Teste</h1>
    </DefaultLayout>
  );
}