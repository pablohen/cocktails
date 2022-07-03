import { Card } from "../../components/Card";
import { useCocktails } from "../../hooks/useCocktails";
import { useUtils } from "../../stores/utils";

export function HomePage() {
  const { drinks } = useCocktails();
  const { handleSelectedDrink } = useUtils();

  return (
    <div className="flex justify-center flex-wrap gap-4">
      {drinks.isLoading && <p>Loading...</p>}

      {!drinks.isLoading && !drinks.data ? (
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
