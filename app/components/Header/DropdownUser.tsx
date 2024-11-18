'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/app/components/ClickOutside";
import { useAuth } from "@/app/context/authContext";

const DropdownUser = (props: {
  username: string;
  role: string;
  imageSrc: string;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { logout } = useAuth();

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 cursor-pointer"
      >
        {}
        <Image
          src={props.imageSrc}
          alt="User Profile"
          width={40}
          height={40}
          className="rounded-full w-10 h-10"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{props.username}</span>
          <span className="text-sm text-gray-500">{props.role}</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <Link href="/userSettings" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Settings
          </Link>
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;