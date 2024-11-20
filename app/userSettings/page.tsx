'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/authContext';
import DefaultLayout from '@/app/layout/DefaultLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import Image from 'next/image';

const UserSettings = () => {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePicture, setProfilePicture] = useState<string | File>(user?.profilePicture || '');
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setProfilePicture(user.profilePicture);
    }
  }, [user]);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!user) return;

    const formData = new FormData();
    formData.append('userId', user.id);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('profilePicture', profilePicture);
    console.log(formData);

    try {
      const response = await fetch('/api/updateUser', {
        method: 'PUT',
        body: formData,
      });

      const contentType = response.headers.get('Content-Type');
      if (!response.ok) {
        const errorData = contentType && contentType.includes('application/json')
          ? await response.json()
          : { error: 'Failed to update user' };
        setError(errorData.error || 'Failed to update user');
      } else {
        const userData = contentType && contentType.includes('application/json')
          ? await response.json()
          : null;
        if (userData) {
          login(userData);
          setSuccess('User updated successfully');
        } else {
          setError('Unexpected response format');
        }
      }
    } catch (error) {
      setError('An unexpected error occurred: ' + error);
    }
  };
  
  return (
    <ProtectedRoute>
      <DefaultLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} loading={false}>
        <div className='w-full'>
          <div className="flex flex-col lg:flex-row gap-9 w-full">
            <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  User Settings
                </h3>
              </div>
              <div className="p-6.5">
                {error && <div className="mb-4.5 text-red-500">{error}</div>}
                {success && <div className="mb-4.5 text-green-500">{success}</div>}
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Profile Picture
                  </label>
                  <div className="relative group w-25 h-25">
                    <Image
                      src={profilePicturePreview || `${user?.profilePicture}`}
                      alt="User Profile"
                      width={100}
                      height={100}
                      className="rounded-full w-25 h-25 object-cover"
                      id="profilePicturePreview"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => document.getElementById('profilePictureInput')?.click()}>
                      <input
                      type="file"
                      id="profilePictureInput"
                      name="profilePicture"
                      accept="image/png, image/jpeg, image/jpg, image/gif"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                      />
                      <svg className='w-8 h-8 fill-white cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default UserSettings;