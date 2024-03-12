import { useState, useEffect } from 'react'
import bookService from '@/app/lib/bookService'
import RecordItem from '@/app/ui/recordItem';
import Search from '@/app/ui/search';

export default function Records() {

	const [data, setData] = useState(null)
  	const [isLoading, setLoading] = useState(false)
 
	useEffect(() => {
		const subscription = bookService.bookResults.subscribe((results) => {
			console.log('REACTING');
			console.log(results);
			setData(results);
	    });

		// Clean up the subscription on component unmount
    	return () => {subscription.unsubscribe();};	
	}, [])

	return (
		<div className="min-h-full min-w-full">
			<Search placeholder="Search books..." />
			<div className="w-full mx-auto bg-white rounded-xl shadow-md p-5">
			  <div className="md:flex">
			    <p> Total Items: {data?.totalItems || 0} </p>
			    <div className="p-8">
			    {
			    	isLoading ? <p>Loading...</p> : !data ? <p>No results to display</p> : 
			    	<ul>
			    	{data?.items.map(item => <RecordItem book={item}/>)}
			    	</ul>
			    }
			    </div>
			  </div>
			</div>
		</div>
	);
}