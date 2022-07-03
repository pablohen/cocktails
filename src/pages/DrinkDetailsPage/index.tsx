import { useCocktails } from "../../hooks/useCocktails";
import { Ingredients } from "./Ingredients";
import { Instructions } from "./Instructions";
import { Thumbnail } from "./Thumbnail";
import { Title } from "./Title";

export function DrinkDetailsPage() {
  const { drink } = useCocktails();

  return (
    <main className="w-full">
      {drink.isLoading && <p className="text-center">Loading...</p>}

      {drink.data && (
        <div>
          <Title value={`${drink.data.strDrink} (${drink.data.strCategory})`} />

          <div className="flex flex-col sm:flex-row w-full gap-8">
            <div>
              <Thumbnail
                image={drink.data.strDrinkThumb}
                name={drink.data.strDrink}
              />
            </div>

            <div className="flex flex-col space-y-4">
              <Ingredients drink={drink.data} />
              <Instructions drink={drink.data} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
