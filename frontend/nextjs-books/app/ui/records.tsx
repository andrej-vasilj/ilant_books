import { useState, useEffect } from 'react'
import bookService from '@/app/lib/bookService'
import RecordItem from '@/app/ui/recordItem';

export default function Records() {

	const [data, setData] = useState({isLoading: false, items: []});
  const [isLoading, setLoading] = useState(false);
 
	useEffect(() => {
		const subscription = bookService.bookResults.subscribe((results) => {
			console.log('REACTING');
			console.log(results);
			setLoading(results?.isLoading || false);
			setData(results);
	  });

		// Clean up the subscription on component unmount
    return () => {subscription.unsubscribe();};	
	}, []);

	const getState = () => {
		if (!!isLoading) {
			return (<p>Loading...</p>);
		} else {
			if (data?.error)
				return (<p>Error: {data.error}</p>);
			else if (data?.items.length == 0)
				return (<p>No results to display</p>);
			else
				return (
					<ul role="list" class="divide-y divide-rich-green">
			    	{data?.items.map(item => <RecordItem book={item}/>)}
		    	</ul>
				);
		}
	}

	return (
		<div className="min-h-full min-w-full">
			<div className="w-full mx-auto rounded-xl shadow-md p-5 border-2 border-rich-green bg-white">
			  <div className="md:flex bg-white">
			  	{ getState() }
			  </div>
			</div>
		</div>
	);
}