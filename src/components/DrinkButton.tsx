import { DrinkDTO } from '../interfaces/DrinkDTO';

interface Props {
  drink: DrinkDTO;
  onClick: (id: string) => void;
}

const DrinkButton = ({ drink, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={() => onClick(drink.idDrink)}
      className="w-72 m-2 transition-all duration-400 ease-in-out hover:-translate-y-2"
    >
      <div className="relative">
        <img
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          className="rounded"
        />

        <div className="bg-black opacity-80 px-4 py-2 absolute bottom-0 right-0 rounded-tl rounded-br">
          <span className="text-white font-bold">{drink.strDrink}</span>
        </div>
      </div>
    </button>
  );
};

export default DrinkButton;
