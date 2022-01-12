import { DrinkDTO } from '../../interfaces/DrinkDTO';

interface Props {
  drink: DrinkDTO;
}

const Thumbnail = ({ drink }: Props) => {
  return (
    <img
      src={drink.strDrinkThumb}
      alt={drink.strDrink}
      className="rounded w-full h-auto max-w-[256px] max-h-[256px]"
    />
  );
};

export default Thumbnail;
