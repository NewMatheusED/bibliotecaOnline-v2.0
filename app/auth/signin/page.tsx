'use client';

import { useState } from 'react';
import DefaultLayout from '@/app/layout/DefaultLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authContext';

export default function Signin() {
  const { login } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formErrorSignin, setFormErrorSignin] = useState('');
  const [formErrorSignup, setFormErrorSignup] = useState('');
  const [loadingFormSignUp, setLoadingFormSignUp] = useState(false);
  const [loadingFormSignIn, setLoadingFormSignIn] = useState(false);
  const router = useRouter();

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    setLoadingFormSignUp(true);
    e.preventDefault();
    if (password !== retypePassword) {
      setPasswordError('Passwords do not match');
      setLoadingFormSignUp(false);
    } else {
      setPasswordError('');
      setFormErrorSignup('');

      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify(Object.fromEntries(formData)),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setFormErrorSignup(errorData.error || 'Failed to register user');
        } else {
          const userData = await response.json();
          login(userData); // Store user data in context and localStorage
          router.push('/');
        }
      } catch (error) {
        setFormErrorSignup('An unexpected error occurred: ' + error);
      } finally {
        setLoadingFormSignUp(false);
      }
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    setLoadingFormSignIn(true);
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFormErrorSignin(errorData.error || 'Failed to sign in');
      } else {
        const userData = await response.json();
        login(userData);
        router.push('/');
      }
    } catch (error) {
      setFormErrorSignin('An unexpected error occurred: ' + error);
    } finally {
      setLoadingFormSignIn(false);
    }
  };

  return (
    <DefaultLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} loading={false}>
      <div className='w-full'>
        <div className="flex flex-col lg:flex-row gap-9 w-full">
          {/* <!-- Sign In Form --> */}
          <div className="w-full lg:w-1/2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Sign In Form
              </h3>
            </div>
            <form onSubmit={handleSignInSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-5.5 mt-5 flex items-center justify-between">
                  <label htmlFor="formCheckbox" className="flex cursor-pointer">
                    <div className="relative pt-0.5">
                      <input
                        type="checkbox"
                        id="formCheckbox"
                        className="taskCheckbox sr-only"
                      />
                      <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
                        <span className="text-white opacity-0">
                          <svg
                            className="fill-current"
                            width="10"
                            height="7"
                            viewBox="0 0 10 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                              fill=""
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <p>Remember me</p>
                  </label>

                  <Link
                    href="#"
                    className="text-sm text-primary hover:underline"
                  >
                    Forget password?
                  </Link>
                </div>

                {formErrorSignin && (
                  <div className="mb-4.5 text-red-500">
                    {formErrorSignin}
                  </div>
                )}

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  {loadingFormSignIn ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : "Sign In"}
                </button>
              </div>
            </form>
          </div>

          {/* <!-- Sign Up Form --> */}
          <div className="w-full lg:w-1/2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Sign Up Form
              </h3>
            </div>
            <form onSubmit={handleSignUpSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name='name'
                    placeholder="Enter your full name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name='email'
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Re-type Password
                  </label>
                  <input
                    type="password"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {passwordError && (
                  <div className="mb-4.5 text-red-500">
                    {passwordError}
                  </div>
                )}

                {formErrorSignup && (
                  <div className="mb-4.5 text-red-500">
                    {formErrorSignup}
                  </div>
                )}

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                {loadingFormSignUp ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}