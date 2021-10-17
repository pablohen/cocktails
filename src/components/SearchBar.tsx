import { FiSearch } from 'react-icons/fi';

interface Props {
  reference: any;
  onSubmit: any;
}

const SearchBar = ({ reference, onSubmit }: Props) => (
  <form onSubmit={onSubmit} className="">
    <div className="flex items-center bg-white dark:bg-gray-800 border dark:border-gray-900 p-2 rounded-full shadow-sm text-gray-500 focus-within:text-gray-800 dark:focus-within:text-gray-200 focus-within:shadow-md">
      <FiSearch className="h-6" />
      <input
        type="text"
        placeholder="search..."
        className="w-full bg-transparent outline-none px-2"
        ref={reference}
      />
    </div>
  </form>
);

export default SearchBar;
