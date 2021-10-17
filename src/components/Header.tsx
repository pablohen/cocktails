import { useCocktail } from '../hooks/useCocktail';
import CategoryButton from './CategoryButton';
import { FiCoffee, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  const { categories, handleSelectedCategory } = useCocktail();
  const searchTerm = useRef<any>('');
  const { setSearchTerm } = useCocktail();

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchTerm(searchTerm.current.value);
  };

  return (
    <div className="bg-yellow-500 pt-4 pb-48">
      <Link to="/">
        <div className="flex flex-col w-full justify-center items-center py-8">
          <h1 className="text-white text-5xl text-center font-bold">{title}</h1>
          <FiCoffee className="text-4xl text-white mt-8" />
        </div>
      </Link>

      <nav className="">
        <ul className="flex justify-center items-center flex-wrap w-full px-4">
          {categories.map((category) => (
            <li key={category.strCategory} className="">
              <CategoryButton
                category={category.strCategory}
                onClick={handleSelectedCategory}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex w-full justify-center pt-6">
        <form onSubmit={handleSearch} className="">
          <div className="flex items-center bg-white dark:bg-gray-800 border dark:border-gray-900 p-2 rounded-full shadow-sm text-gray-500 focus-within:text-gray-800 dark:focus-within:text-gray-200 focus-within:shadow-md">
            <FiSearch className="h-6" />
            <input
              type="text"
              placeholder="search..."
              className="w-full bg-transparent outline-none px-2"
              ref={searchTerm}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;
