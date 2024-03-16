'use client';

import Image from "next/image";
import Records from '@/app/ui/records';
import { Suspense } from "react";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-1">
      <div className="w-full max-w-6xl">
        <div className="w-full items-center justify-between font-mono text-sm lg:flex p-1">
          <Suspense>
            <Records/>
          </Suspense>
        </div>
      </div>
    </main>
  );
}
