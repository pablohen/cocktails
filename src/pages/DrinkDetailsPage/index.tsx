import { useMemo } from "react";
import { useCocktail } from "../../hooks/useCocktail";
import { Subtitle } from "./Subtitle";
import { Thumbnail } from "./Thumbnail";
import { Title } from "./Title";

export function DrinkDetailsPage() {
  const { getDrink } = useCocktail();

  const drink = getDrink();

  const ingredients = useMemo(() => {
    if (drink.isLoading || drink.isError || !drink.data) {
      return [];
    }

    return Object.entries(drink.data).filter((item) =>
      item[0].startsWith("strIngredient")
    );
  }, [drink]);

  return (
    <main className="w-full">
      {drink.isLoading && <p className="text-center">Loading...</p>}

      {drink.data && (
        <div>
          <Title value={drink.data.strDrink} />

          <div className="flex flex-col sm:flex-row w-full gap-8">
            <div>
              <Thumbnail
                image={drink.data.strDrinkThumb}
                name={drink.data.strDrink}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <Subtitle value="Category" />
                <p>{drink.data.strCategory}</p>
              </div>

              <div>
                <Subtitle value="Ingredients" />

                {ingredients.map((ingredient) => {
                  return <p key={ingredient[0]}>{ingredient[1]}</p>;
                })}
              </div>

              <div>
                <Subtitle value="Instructions" />
                <p>{drink.data.strInstructions}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
