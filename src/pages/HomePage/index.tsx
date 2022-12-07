import { Card } from "../../components/Card";
import { useCocktail } from "../../hooks/useCocktail";
import { useUtils } from "../../stores/utils";

export function HomePage() {
  const { getDrinks } = useCocktail();
  const { handleSelectedDrink } = useUtils();

  const drinks = getDrinks();

  return (
    <div className="flex justify-center flex-wrap gap-4">
      {drinks.isInitialLoading && <p>Loading...</p>}

      {!drinks.isInitialLoading && !drinks.data ? (
        <p>Please select a beverage category above or search for its name.</p>
      ) : (
        drinks.data?.map((drink) => (
          <Card
            key={drink.idDrink}
            id={drink.idDrink}
            name={drink.strDrink}
            image={drink.strDrinkThumb}
            onClick={handleSelectedDrink}
          />
        ))
      )}
    </div>
  );
}
