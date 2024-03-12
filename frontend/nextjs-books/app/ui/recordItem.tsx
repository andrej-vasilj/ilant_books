import Image from "next/image";

export default function RecordItem({book}) {
	console.log('ITEM')
	console.log(book);
	return (
		<li className="flex justify-between gap-x-6 py-5" key={book.id}>
	    <div className="flex min-w-0 gap-x-4">
	    	<Image
	        src={book.volumeInfo?.imageLinks?.smallThumbnail || '/no_preview.png'}
	        alt="No Preview"
	        height="100"
	        width="100"
	        className="flex-none bg-gray-50 rounded"
	      />
	      <div className="min-w-0 flex-auto">
	        <p className="text-sm font-semibold leading-6 text-gray-900">{book.title}</p>
	        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{book.volumeInfo?.authors.join(',')}</p>
	      </div>
	    </div>
	    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
	      <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
	      <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
	    </div>
	    
	  </li>
	);
}