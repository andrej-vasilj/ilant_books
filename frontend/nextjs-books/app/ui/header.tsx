'use client';

import Image from "next/image";
import Search from '@/app/ui/search';

export default function Header() {
  return (
    <div>
      <div className="flex justify-between p-5 bg-dark-green">
        <Image
          src="/Logo2.svg"
          alt="Ilant Books"
          height="200"
          width="200"
          className="flex-none rounded max-h-32"
        />
        <Image
          src="/tree2.png"
          alt="Tree of Life"
          height="150"
          width="130"
          className="flex-none rounded absolute top-0 right-0"
        />

      </div>


      <header className="bg-grey shadow">
        <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <Search placeholder="Search books..." />
        </div>
      </header>
    </div>
  );
}