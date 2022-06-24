import { DrinkDTO } from '../interfaces/DrinkDTO';

interface Props {
  drink: DrinkDTO;
  onClick: (id: string) => void;
}

export function DrinkButton({ drink, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={() => onClick(drink.idDrink)}
      className="m-2 transition-all duration-400 ease-in-out hover:-translate-y-2 bg-gray-500 rounded relative"
      style={{
        background: `url('${drink.strDrinkThumb}')`,
        width: '256px',
        height: '256px',
        backgroundSize: 'contain',
      }}
    >
      <div className="bg-black opacity-80 px-4 py-2 absolute bottom-0 right-0 rounded-tl rounded-br">
        <span className="text-white font-bold">{drink.strDrink}</span>
      </div>
    </button>
  );
}
