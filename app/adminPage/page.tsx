'use client';   

import DefaultLayout from '@/app/layout/DefaultLayout';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext'; 
import Image from 'next/image';
import { CircleMinus, RefreshCcw } from 'lucide-react';

export default function AdminPage() {

    interface User {
        id: number;
        name: string;
        email: string;
        role: string;
        profilePicture: string;
    }
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

    const { user } = useAuth();

    useEffect(() => {
        if (user && user.role !== 'admin') {
            window.history.back();
        }
    })

    function getUsers() {
        fetch('/api/getUsers')
        .then(response => response.json())
        .then(data => {
            setUsers(data);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        getUsers();
    }, [user]);

    function refreshUsers() {
        setLoading(true);
        getUsers();
    }

    function openDeleteModal(id: number) {
        setUserIdToDelete(id);
        setIsModalOpen(true);
    }

    function handleDeleteUser() {
        if (userIdToDelete === null) return;

        fetch('/api/removeUser', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: userIdToDelete })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                setUsers(users.filter(user => user.id !== userIdToDelete));
                setIsModalOpen(false);
            }
        })
        .catch(() => {
            alert('Failed to delete user CATCH error');
        });
    }

    return (
        <ProtectedRoute>
            <DefaultLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} loading={false}>
                <div className="title flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-black dark:text-white">Adminstração de usuários</h1>
                    <div onClick={() => {refreshUsers()}} className="reloadusers flex gap-3 items-center bg-white dark:bg-strokedark shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-boxdark">
                        <RefreshCcw />
                        <p>Refresh Users</p>
                    </div>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full mt-4 bg-white dark:bg-boxdark shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 dark:bg-strokedark">
                                <tr>
                                    <th className="text-left p-4"></th>
                                    <th className="text-left p-4">Name</th>
                                    <th className="text-left p-4">Email</th>
                                    <th className="text-left p-4">Role</th>
                                    <th className='text-left p-4'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b last:border-none dark:border-strokedark">
                                        <td className="p-4">
                                            <Image src={user.profilePicture} alt={user.name} width={52} height={52} className="rounded-full w-13 h-13 object-cover" />
                                        </td>
                                        <td className="p-4">{user.name}</td>
                                        <td className="p-4">{user.email}</td>
                                        <td className="p-4">{user.role}</td>
                                        <td className="p-4">
                                            <button className='hover:text-red transition-all' onClick={() => openDeleteModal(user.id)}><CircleMinus /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-999999">
                        <div className="bg-white dark:bg-boxdark p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                            <p className="mb-4">Are you sure you want to delete this user?</p>
                            <div className="flex justify-end">
                                <button className="mr-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleDeleteUser}>Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </DefaultLayout>
        </ProtectedRoute>
    );
}