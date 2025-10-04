import { useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useCocktails } from "@/hooks/useCocktails";
import { AlertCircle } from "lucide-react";

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

  if (drink.isError) {
    return (
      <div className="w-full">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading drink details</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <p>We couldn't load this drink's information. Please try again.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => drink.refetch()}
              className="w-fit"
            >
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!drink.data) {
    return null;
  }

  const pageTitle = `${drink.data.strDrink} - Cocktail Recipe | Cocktails & Drinks`;
  const pageDescription = `Learn how to make ${drink.data.strDrink}. ${drink.data.strCategory} cocktail recipe with ingredients and instructions.`;

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <>
      <Helmet>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <main className="w-full">
        <h2 className="text-2xl sm:text-3xl md:text-5xl text-center md:text-left mb-4 sm:mb-6">
          {drink.data.strDrink}
        </h2>

      <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-6 md:gap-8">
        <div className="flex justify-center sm:justify-start">
          <img
            src={drink.data.strDrinkThumb}
            alt={`${drink.data.strDrink} cocktail`}
            loading="lazy"
            className="rounded w-full h-auto max-w-[320px] sm:max-w-[400px] md:max-w-[512px]"
          />
        </div>

        <div className="flex flex-col gap-4 sm:gap-6">
          <div>
            <h3 className="text-lg sm:text-2xl md:text-4xl mb-1 sm:mb-2">Category</h3>
            <p className="text-sm sm:text-base">{drink.data.strCategory}</p>
          </div>

          <div>
            <h3 className="text-lg sm:text-2xl md:text-4xl mb-1 sm:mb-2">Ingredients</h3>
            {ingredients.map((ingredient) => {
              if (!ingredient[1]) {
                return null;
              }

              return <p key={ingredient[0]} className="text-sm sm:text-base">{String(ingredient[1])}</p>;
            })}
          </div>

          <div>
            <h3 className="text-lg sm:text-2xl md:text-4xl mb-1 sm:mb-2">Instructions</h3>
            <p className="text-sm sm:text-base leading-relaxed">{drink.data.strInstructions}</p>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
