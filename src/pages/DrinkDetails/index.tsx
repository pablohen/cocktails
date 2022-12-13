import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useCocktail } from "../../hooks/useCocktail";
import { Subtitle } from "./Subtitle";
import { Thumbnail } from "./Thumbnail";
import { Title } from "./Title";

interface Params {
  id: string;
}

export function DrinkDetails() {
  const { getDrink } = useCocktail();
  const { id } = useParams() as unknown as Params;

  const drinkQuery = getDrink({
    id,
  });

  const ingredients = useMemo(() => {
    if (drinkQuery.isLoading || drinkQuery.isError || !drinkQuery.data) {
      return [];
    }

    return Object.entries(drinkQuery.data).filter((item) =>
      item[0].startsWith("strIngredient")
    );
  }, [drinkQuery]);

  return (
    <main className="w-full">
      {drinkQuery.isLoading && <p className="text-center">Loading...</p>}

      {drinkQuery.data && (
        <div>
          <Title value={drinkQuery.data.strDrink} />

          <div className="flex flex-col sm:flex-row w-full gap-8">
            <div>
              <Thumbnail
                image={drinkQuery.data.strDrinkThumb}
                name={drinkQuery.data.strDrink}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <Subtitle value="Category" />
                <p>{drinkQuery.data.strCategory}</p>
              </div>

              <div>
                <Subtitle value="Ingredients" />

                {ingredients.map((ingredient) => {
                  return <p key={ingredient[0]}>{ingredient[1]}</p>;
                })}
              </div>

              <div>
                <Subtitle value="Instructions" />
                <p>{drinkQuery.data.strInstructions}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
