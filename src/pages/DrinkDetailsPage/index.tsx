import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCocktails } from "../../hooks/useCocktails";
import { Subtitle } from "./Subtitle";
import { Thumbnail } from "./Thumbnail";
import { Title } from "./Title";

function DrinkDetailsSkeleton() {
  return (
    <main className="w-full">
      <Skeleton className="h-12 w-64 mb-8" />

      <div className="flex flex-col sm:flex-row w-full gap-8">
        <div>
          <Skeleton className="w-80 h-80 rounded-lg" />
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-6 w-48" />
          </div>

          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-6 w-40" />
          </div>

          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    </main>
  );
}

export function DrinkDetailsPage() {
  const { drink } = useCocktails();

  const ingredients = useMemo(() => {
    if (drink.isLoading || drink.isError || !drink.data) {
      return [];
    }

    return Object.entries(drink.data).filter((item) =>
      item[0].startsWith("strIngredient")
    );
  }, [drink]);

  if (drink.isLoading) {
    return <DrinkDetailsSkeleton />;
  }

  if (!drink.data) {
    return null;
  }

  return (
    <main className="w-full">
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
    </main>
  );
}
