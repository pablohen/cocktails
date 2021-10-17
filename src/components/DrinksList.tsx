import { useCocktail } from '../hooks/useCocktail';
import { DrinkDTO } from '../interfaces/DrinkDTO';
import DrinkButton from './DrinkButton';

interface Props {
  drinks: DrinkDTO[];
}

const DrinksList = ({ drinks }: Props) => {
  const { handleSelectedDrink } = useCocktail();

  return (
    <div className="flex justify-center flex-wrap">
      {!drinks.length && (
        <p>Please select a beverage category above or search for its name.</p>
      )}
      {drinks.map((drink) => (
        <DrinkButton
          key={drink.idDrink}
          drink={drink}
          onClick={handleSelectedDrink}
        />
      ))}
    </div>
  );
};

export default DrinksList;
