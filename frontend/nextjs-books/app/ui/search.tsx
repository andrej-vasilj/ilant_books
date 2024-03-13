import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';
import bookService from '@/app/lib/bookService';

export default function Search({ placeholder }: { placeholder: string }) {

  const handleSearch = useDebouncedCallback((term) => {
    bookService.search(term);
  }, 300);

  return (
    <div className="py-10 w-full">
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-xl border border-rich-green border-2 py-[15px] pl-10 text-md shadow-md placeholder:text-gray-700"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={'quilting'}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[25px] w-[25px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
    </div>
  );
}