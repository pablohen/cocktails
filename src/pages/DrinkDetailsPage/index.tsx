import { AlertCircle } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/contexts/ThemeContext";
import { useCocktails } from "@/hooks/useCocktails";
import { extractColors } from "@/utils/colorExtractor";

function DrinkDetailsSkeleton() {
  return (
    <main className="w-full">
      <Skeleton className="h-12 w-64 mb-6 sm:mb-8 rounded-xl" />

      <div className="flex flex-col lg:flex-row w-full gap-6 sm:gap-8 md:gap-12">
        <div className="flex justify-center lg:justify-start flex-shrink-0">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur-lg opacity-50" />
            <Skeleton className="relative w-full h-auto max-w-[320px] sm:max-w-[400px] lg:max-w-[480px] aspect-square rounded-2xl" />
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8 flex-1">
          <div className="bg-gradient-to-br from-card to-card/80 p-6 rounded-2xl shadow-lg border border-border">
            <Skeleton className="h-8 w-32 mb-3 rounded-lg" />
            <Skeleton className="h-6 w-48 ml-3 rounded-lg" />
          </div>

          <div className="bg-gradient-to-br from-card to-card/80 p-6 rounded-2xl shadow-lg border border-border">
            <Skeleton className="h-8 w-32 mb-4 rounded-lg" />
            <div className="ml-3 space-y-2">
              <Skeleton className="h-6 w-40 rounded-lg" />
              <Skeleton className="h-6 w-36 rounded-lg" />
              <Skeleton className="h-6 w-44 rounded-lg" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-card to-card/80 p-6 rounded-2xl shadow-lg border border-border">
            <Skeleton className="h-8 w-32 mb-4 rounded-lg" />
            <Skeleton className="h-24 w-full ml-3 rounded-lg" />
          </div>
        </div>
      </div>
    </main>
  );
}

export function DrinkDetailsPage() {
  const { drink } = useCocktails();
  const { setColors } = useTheme();

  const ingredients = useMemo(() => {
    if (drink.isLoading || drink.isError || !drink.data) {
      return [];
    }

    return Object.entries(drink.data).filter((item) => item[0].startsWith("strIngredient"));
  }, [drink]);

  const pageTitle = drink.data
    ? `${drink.data.strDrink} - Cocktail Recipe | Cocktails & Drinks`
    : "Cocktail Recipe | Cocktails & Drinks";

  const pageDescription = drink.data
    ? `Learn how to make ${drink.data.strDrink}. ${drink.data.strCategory} cocktail recipe with ingredients and instructions.`
    : "Discover cocktail recipes";

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    if (drink.data?.strDrinkThumb) {
      extractColors(drink.data.strDrinkThumb)
        .then((colors) => setColors(colors))
        .catch((error) => console.error("Failed to extract colors:", error));
    }

    return () => {
      setColors(null);
    };
  }, [drink.data, setColors]);

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
            <Button variant="outline" size="sm" onClick={() => drink.refetch()} className="w-fit">
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

  return (
    <>
      <Helmet>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <main className="w-full">
        <h2 className="text-3xl sm:text-4xl md:text-6xl text-center md:text-left mb-6 sm:mb-8 font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {drink.data.strDrink}
        </h2>

        <div className="flex flex-col lg:flex-row w-full gap-6 sm:gap-8 md:gap-12">
          <div className="flex justify-center lg:justify-start flex-shrink-0">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition duration-300" />
              <img
                src={drink.data.strDrinkThumb}
                alt={`${drink.data.strDrink} cocktail`}
                loading="lazy"
                className="relative rounded-2xl w-full h-auto max-w-[320px] sm:max-w-[400px] lg:max-w-[480px] shadow-2xl"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8 flex-1">
            <div className="bg-gradient-to-br from-card to-card/80 p-6 rounded-2xl shadow-lg border border-border">
              <h3 className="text-xl sm:text-2xl md:text-3xl mb-3 font-bold text-primary flex items-center gap-2">
                <span className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
                Category
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground ml-3">
                {drink.data.strCategory}
              </p>
            </div>

            <div className="bg-gradient-to-br from-card to-card/80 p-6 rounded-2xl shadow-lg border border-border">
              <h3 className="text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-secondary flex items-center gap-2">
                <span className="w-1 h-8 bg-gradient-to-b from-secondary to-accent rounded-full" />
                Ingredients
              </h3>
              <ul className="ml-3 space-y-2">
                {ingredients.map((ingredient) => {
                  if (!ingredient[1]) {
                    return null;
                  }

                  return (
                    <li
                      key={ingredient[0]}
                      className="text-base sm:text-lg text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      {String(ingredient[1])}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-card to-card/80 p-6 rounded-2xl shadow-lg border border-border">
              <h3 className="text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-accent flex items-center gap-2">
                <span className="w-1 h-8 bg-gradient-to-b from-accent to-primary rounded-full" />
                Instructions
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground ml-3">
                {drink.data.strInstructions}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
