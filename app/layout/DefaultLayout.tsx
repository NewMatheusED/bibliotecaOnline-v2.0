// components/DefaultLayout.tsx

import React from 'react';
import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';

interface DefaultLayoutProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  loading?: boolean;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, sidebarOpen, setSidebarOpen, loading = false }) => {
  return (
    <div className='flex'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-1 flex-col lg:ml-72.5">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
              </div>
            ) : (
              children
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;