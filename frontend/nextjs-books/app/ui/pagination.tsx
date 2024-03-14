import { useState, useEffect } from 'react';
import bookService from '@/app/lib/bookService';

const defaultData = {
	totalItems: 0,
	currentPage: 0,
	numPages: 0,
	itemsPerPage: 0,
	startIndex: 0,
	showing: 0,
	query: '',
};

export default function Pagination() {

	const [data, setData] = useState(defaultData);
 
	useEffect(() => {
		const subscription = bookService.bookResults.subscribe((results) => {
			if (results?.startIndex !== undefined) {
				const nItems = results?.items?.length || 0;
				const startIndex = results?.startIndex || 0;
				const totalItems = results?.totalItems || 0;

				setData({
					query: results?.query || '',
					totalItems: totalItems,
					itemsPerPage: nItems,
					currentPage: startIndex > 0? Math.ceil(startIndex / nItems) + 1: 1,
					numPages: nItems > 0? Math.ceil(totalItems / nItems): 0,
					startIndex: nItems > 0? startIndex + 1: 0,
					showing: Math.min(startIndex + nItems, totalItems)
				});
			} else {
				setData(defaultData);
			}
	  });

		// Clean up the subscription on component unmount
    return () => {subscription.unsubscribe();};	
	}, []);

	const runSearch = (desiredPage) => {
		bookService.search(data.query, (desiredPage - 1) * data.itemsPerPage);
	}

	const getPageLinks = () => {
		const sharedClasses = 'relative  inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ';
		const currentPageClasses = 'z-10 bg-dark-green text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black';
		const otherPageClasses = 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0';
		const pagesRemaining = data.numPages - data.currentPage;
		const cp = data.currentPage;
		const np = data.numPages;

		if (pagesRemaining > 5) {
			return (
				<>
					<a href="#" onClick={() => runSearch(cp)} className={sharedClasses + currentPageClasses}>{cp}</a>
		      <a href="#" onClick={() => runSearch(cp+1)} className={sharedClasses + otherPageClasses}>{cp + 1}</a>
		      <a href="#" onClick={() => runSearch(cp+2)} className={sharedClasses + otherPageClasses}>{cp + 2}</a>
			    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
			    <a href="#" onClick={() => runSearch(np-2)} className={sharedClasses + otherPageClasses}>{np - 2}</a>
			    <a href="#" onClick={() => runSearch(np-1)} className={sharedClasses + otherPageClasses}>{np - 1}</a>
			    <a href="#" onClick={() => runSearch(np)} className={sharedClasses + otherPageClasses}>{np}</a>
			  </>
			);
		} else {
			return (
				<>
					{Array(pagesRemaining).fill(1).map((itm, i) => {
						if (i === 0)
							return <a href="#" className={sharedClasses + currentPageClasses}>{cp}</a>
						else
							return <a href="#" className={sharedClasses + otherPageClasses}>{cp + i}</a>
					})}
			  </>
			);
		}
	}

	return (
		<div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
		  <div className="flex flex-1 justify-between sm:hidden">
		    <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
		    <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
		  </div>
		  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
		    <div>
		      <p className="text-sm text-gray-700">
		        Showing
		        <span className="text-black font-bold p-1">{data.startIndex}</span>
		        to
		        <span className="text-black font-bold p-1">{data.showing}</span>
		        of
		        <span className="text-black font-bold p-1">{data.totalItems}</span>
		        results
		      </p>
		    </div>
		    <div>
		      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
		        <a href="#" onClick={() => runSearch(data.currentPage > 1? data.currentPage - 1 : 1)} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
		          <span className="sr-only">Previous</span>
		          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
		            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
		          </svg>
		        </a>

		        {getPageLinks()}

		        <a href="#" onClick={() => runSearch(data.currentPage < data.numPages? data.currentPage + 1 : data.numPages)} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
		          <span className="sr-only">Next</span>
		          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
		            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
		          </svg>
		        </a>
		      </nav>
		    </div>
		  </div>
		</div>
	);
}