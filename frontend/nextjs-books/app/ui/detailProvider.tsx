'use client';

import Detail from '@/app/ui/detail';
import { useSearchParams } from 'next/navigation';
 
export default function DetailProvider() {
  const searchParams = useSearchParams()
  return (
  	<Detail bookId={searchParams.get('bookId') || ''}/>
  );
}