// app/components/DropdownUser.tsx

'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/app/components/ClickOutside";

const DropdownUser = (props: {
  username: string;
  privilege: string;
  imageSrc: string;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <Image
          src={props.imageSrc}
          alt="User Profile"
          width={40}
          height={40}
          className="rounded-full w-10 h-10"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{props.username}</span>
          <span className="text-sm text-gray-500">{props.privilege}</span>
        </div>
      </div>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <Link href="/profile" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Profile
          </Link>
          <Link href="/settings" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Settings
          </Link>
          <Link href="/logout" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Logout
          </Link>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;