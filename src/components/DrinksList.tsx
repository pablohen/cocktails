import { useCocktail } from '../context/drinks';
import { DrinkDTO } from '../interfaces/DrinkDTO';
import DrinkButton from './DrinkButton';

interface Props {
  drinks: DrinkDTO[];
}

const DrinksList = ({ drinks }: Props) => {
  const { handleSelectedDrink } = useCocktail();

  return (
    <>
      {drinks?.length ? (
        drinks.map((drink) => (
          <DrinkButton
            key={drink.idDrink}
            drink={drink}
            onClick={handleSelectedDrink}
          />
        ))
      ) : (
        <p>Please select a beverage category above or search for its name.</p>
      )}
    </>
  );
};

export default DrinksList;
