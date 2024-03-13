import Image from "next/image";

export default function RecordItem({book}) {
	console.log('ITEM')
	console.log(book);
	const authors = book.volumeInfo?.authors || [];
	return (
		<li className="flex justify-between hover:shadow-md gap-x-6 p-5" key={book.id}>
	    <div className="flex min-w-0 w-full gap-x-4">
	    	<Image
	        src={book.volumeInfo?.imageLinks?.smallThumbnail || '/no_preview2.png'}
	        alt="No Preview"
	        height="100"
	        width="100"
	        className="flex-none rounded max-h-32"
	      />
	      <div className="min-w-0 flex-auto w-full">
	      	<div className="shrink-0 flex flex-wrap justify-between">
	      		<p className="text-lg font-bold leading-6 text-gray-900">{book.volumeInfo?.title}</p>
	      		<p className="mt-1 text-xs leading-5 text-gray-500">Published: <time datetime="2023-01-23">{book.volumeInfo?.publishedDate}</time></p>
	      	</div>
	        <p className="mt-1 truncate text-xs leading-5 text-gray-700">{authors.slice(0, 3).join(', ') + (authors.length > 3 ? <p className="italic"> et al.</p> : '')}</p>
	        <div className="max-width-prose">
	        	<p className="mt-1 text-xs leading-5 text-gray-500 line-clamp-3">{book.volumeInfo?.description}</p>
	        </div>
	      </div>
	    </div>	    
	  </li>
	);
}