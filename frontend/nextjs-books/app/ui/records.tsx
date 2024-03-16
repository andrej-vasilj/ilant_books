import { useState, useEffect } from 'react';
import bookService, { Book } from '@/app/lib/bookService';
import RecordItem from '@/app/ui/recordItem';
import LoadingSpinner from '@/app/ui/loadingSpinner';
import Pagination from '@/app/ui/pagination';
import Detail from '@/app/ui/detail';
import { useSearchParams } from 'next/navigation';

export default function Records() {

	const searchParams = useSearchParams();
	const bookId = searchParams.get('bookId');

	const [data, setData] = useState<any>({isLoading: false, items: []});
  const [isLoading, setLoading] = useState(false);
 
	useEffect(() => {
		const subscription = bookService.bookResults.subscribe((results: any) => {
			setLoading(results?.isLoading || false);
			setData(results);
	  });

		// Clean up the subscription on component unmount
    return () => {subscription.unsubscribe();};	
	}, []);

	const getState = () => {
		if (!!isLoading) {
			return (<LoadingSpinner/>);
		} else {
			if (data?.error)
				return (<p>Error: {data.error}</p>);
			else if (data?.items.length == 0)
				return (<p>No results to display</p>);
			else
				return (
					<ul role="list" className="divide-y divide-rich-green">
			    	{data?.items.map((item: Book) => <RecordItem key={item.id} book={item}/>)}
		    	</ul>
				);
		}
	}

	return (
		<div className="min-h-full min-w-full">
			{!!bookId && <Detail bookId={bookId}/>}
			{!bookId && (
				<div className="w-full mx-auto rounded-xl shadow-md p-5 border-2 border-rich-green bg-white">
					<Pagination/>
				  <div className="md:flex bg-white">
				  	{ getState() }
				  </div>
				</div>
			)}
		</div>
	);
}