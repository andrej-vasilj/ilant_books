'use client';

import Image from "next/image";
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import bookService from '@/app/lib/bookService';
import { useState, useEffect } from 'react';

export default function Detail({ params }: { params: { id: string } }) {

	const [book, setBook] = useState({});

	useEffect(() => {
		const subscription = bookService.bookResults.subscribe((results) => {
			if (results?.items?.length > 0) {
				const book = results.items.find(b => b.id === params.id);
				setBook(book || {});
			}
		});

		// Clean up the subscription on component unmount
    	return () => {subscription.unsubscribe();};	
	}, [params.id]);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-1">
	      <div className="w-full max-w-6xl h-full">
	      	<Link key="home" href="/" className="float-left">
	      		<button type="button" className="bg-dark-green p-2 rounded-xl shadow-md">
		    		<ArrowLeftIcon className="h-[25px] w-[25px] float-left mr-2 text-white" /> <span className="font-bold text-white"> Back </span>
		    	</button>
		    </Link>
	        <div className="w-full items-start justify-between font-mono flex p-1 h-full">
	          <Image
		        src={book.volumeInfo?.imageLinks?.thumbnail || '/no_preview2.png'}
		        alt="No Preview"
		        height="100"
		        width="100"
		        className="rounded object-contain w-40 h-auto mt-4"
		      />
		      <div className="min-w-0 flex-auto w-full p-3">
		      	<div className="shrink-0 flex flex-col justify-between">
		      		<p className="text-lg font-bold leading-6 text-gray-900">{book.volumeInfo?.title}</p>
		      		<p className="mt-1 truncate text-md leading-5 text-gray-700"><b>Authors: </b> {book.volumeInfo?.authors.join(', ')}</p>
		      		<p className="mt-1 text-md leading-5 text-gray-500"><b>Published: </b> <time dateTime="2023-01-23">{book.volumeInfo?.publishedDate}</time></p>
		      		<p className="mt-1 text-sm leading-5 text-gray-500"><b>Description: </b>{book.volumeInfo?.description}</p>
		      	</div>
		      </div>
	        </div>
	      </div>
	    </main>
	);
}