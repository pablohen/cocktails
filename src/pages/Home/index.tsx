import { Card } from "../../components/Card";
import { useCocktail } from "../../hooks/useCocktail";

export function Home() {
  const { getDrinks, handleSelectedDrink } = useCocktail();

  const drinksQuery = getDrinks();

  return (
    <div className="flex justify-center flex-wrap gap-4">
      {drinksQuery.isInitialLoading && <p>Loading...</p>}

      {!drinksQuery.isInitialLoading && !drinksQuery.data ? (
        <p>Please select a beverage category above or search for its name.</p>
      ) : (
        drinksQuery.data?.map((drink) => (
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
