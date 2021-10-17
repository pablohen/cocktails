import { useCocktail } from '../hooks/useCocktail';
import CategoryButton from './CategoryButton';
import { FiCoffee } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  const { categories, handleSelectedCategory } = useCocktail();

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
    </div>
  );
};

export default Header;
