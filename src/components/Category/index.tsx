import { useCocktail } from "../../hooks/useCocktail";

interface Props {
  name: string;
  onClick: (categoryName: string) => void;
}

export function Category({ name, onClick }: Props) {
  const { selectedCategory } = useCocktail();

  const handleClick = () => {
    onClick(name);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`text-lg font-bold rounded-lg ${
        name === selectedCategory
          ? "bg-yellow-400 hover:bg-yellow-300"
          : "bg-gray-100 hover:bg-white"
      }  text-gray-700 px-4 py-2 m-2 shadow-lg  hover:shadow-xl hover:text-black transition-all duration-200 ease-in-out`}
    >
      {name}
    </button>
  );
}
