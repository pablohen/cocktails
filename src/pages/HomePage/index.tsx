import { DrinkButton } from '../../components/DrinkButton';
import { useUtils } from '../../stores/utils';
import { useDrinks } from '../../hooks/useDrinks';

export function HomePage() {
  const { drinks } = useDrinks();
  const { handleSelectedDrink } = useUtils();

  return (
    <div className="flex justify-center flex-wrap">
      {drinks.isLoading && <p>Loading...</p>}

      {!drinks.isLoading && !drinks.data ? (
        <p>Please select a beverage category above or search for its name.</p>
      ) : (
        drinks.data?.map((drink) => (
          <DrinkButton
            key={drink.idDrink}
            drink={drink}
            onClick={handleSelectedDrink}
          />
        ))
      )}
    </div>
  );
}
