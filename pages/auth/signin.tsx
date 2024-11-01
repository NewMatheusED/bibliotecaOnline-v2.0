import { useState } from 'react';
import DefaultLayout from '@/app/layout/DefaultLayout'

export default function Signin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DefaultLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <h1>Teste</h1>
    </DefaultLayout>
  );
}