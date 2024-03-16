'use client';

import Detail from '@/app/ui/detail';
import { useSearchParams } from 'next/navigation';
 
export default function Page() {
  const searchParams = useSearchParams()
  return (
  	<Detail bookId={searchParams.get('bookId')}/>
  );
}