import { useUtils } from '../stores/utils';

interface Props {
  value: string;
  onClick: (category: string) => void;
}

export function CategoryButton({ value, onClick }: Props) {
  const { selectedCategory } = useUtils();

  return (
    <button
      type="button"
      onClick={() => {
        onClick(value);
      }}
      className={`text-lg font-bold rounded-lg ${
        value === selectedCategory
          ? 'bg-yellow-400 hover:bg-yellow-300'
          : 'bg-gray-100 hover:bg-white'
      }  text-gray-700 px-4 py-2 m-2 shadow-lg  hover:shadow-xl hover:text-black transition-all duration-200 ease-in-out`}
    >
      {value}
    </button>
  );
}
