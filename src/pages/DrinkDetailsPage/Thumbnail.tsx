import { DrinkDTO } from '../../interfaces/DrinkDTO';

interface Props {
  drink: DrinkDTO;
}

const Thumbnail = ({ drink }: Props) => {
  return (
    <img src={drink.strDrinkThumb} alt={drink.strDrink} className="rounded" />
  );
};

export default Thumbnail;
