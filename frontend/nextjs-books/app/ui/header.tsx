'use client';

import Image from "next/image";
import Search from '@/app/ui/search';

export default function Header() {
  return (
    <div>
      <div className="flex justify-between p-5 bg-dark-green h-24">
        <Image
          src="/Logo2.svg"
          alt="Ilant Books"
          height="200"
          width="200"
          className="flex-none rounded h-12 w-auto hover:animate-shrink fill-mode-forwards"
        />
        <Image
          src="/tree2.png"
          alt="Tree of Life"
          height="150"
          width="130"
          className="flex-none rounded absolute top-0 right-0 h-32 w-auto"
          priority
        />

      </div>


      <header className="bg-zinc-300">
        <div className="flex mx-auto items-center max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Search placeholder="Search books..." />
        </div>
      </header>
    </div>
  );
}