import React from 'react';
import { useCocktail } from '../hooks/useCocktail';

interface Props {
  category: string;
  onClick: (category: string) => void;
}

const CategoryButton = ({ category, onClick }: Props) => {
  const { selectedCategory } = useCocktail();

  return (
    <button
      type="button"
      onClick={() => onClick(category)}
      className={`text-lg font-bold rounded-lg ${
        category === selectedCategory
          ? 'bg-yellow-400 hover:bg-yellow-300'
          : 'bg-gray-100 hover:bg-white'
      }  text-gray-700 px-4 py-2 m-2 shadow-lg  hover:shadow-xl hover:text-black transition-all duration-200 ease-in-out`}
    >
      {category}
    </button>
  );
};

export default CategoryButton;
