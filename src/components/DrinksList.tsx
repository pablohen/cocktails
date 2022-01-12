import { useCocktail } from '../context/drinks';
import { DrinkDTO } from '../interfaces/DrinkDTO';
import DrinkButton from './DrinkButton';

interface Props {
  drinks: DrinkDTO[];
}

const DrinksList = ({ drinks }: Props) => {
  const { loading, handleSelectedDrink } = useCocktail();

  if (loading) {
    return (
      <div className="flex justify-center flex-wrap">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-wrap">
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
    </div>
  );
};

export default DrinksList;
