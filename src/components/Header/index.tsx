import { FiCoffee } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCocktail } from "../../hooks/useCocktail";
import { useUtils } from "../../stores/utils";
import { Category } from "../Category";
import { SearchBar } from "../SearchBar";

interface Props {
  title: string;
}

export function Header({ title }: Props) {
  const { getCategories } = useCocktail();
  const { handleSelectedCategory, handleSearch } = useUtils();

  const categoriesQuery = getCategories();

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
          {categoriesQuery.data?.map((category) => (
            <li key={category.strCategory}>
              <Category
                name={category.strCategory}
                onClick={handleSelectedCategory}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex w-full justify-center pt-6">
        <SearchBar onSubmit={handleSearch} />
      </div>
    </div>
  );
}
