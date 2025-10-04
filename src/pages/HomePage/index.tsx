import { Card } from "@/components/Card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useCocktails } from "@/hooks/useCocktails";
import { useUtils } from "@/stores/utils";
import { AlertCircle } from "lucide-react";

function CardSkeleton() {
  return (
    <div className="w-64 space-y-0 overflow-hidden rounded-lg border">
      <Skeleton className="h-64 w-full rounded-none" />
      <div className="bg-black/80 p-4">
        <Skeleton className="h-6 w-32 bg-gray-600" />
      </div>
    </div>
  );
}

export function HomePage() {
  const { drinks } = useCocktails();
  const { handleSelectedDrink } = useUtils();

  return (
    <div className="flex justify-center flex-wrap gap-4">
      {drinks.isLoading && (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </>
      )}

      {drinks.isError && (
        <div className="w-full max-w-2xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading drinks</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              <p>We couldn't load the drinks. Please try again.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => drinks.refetch()}
                className="w-fit"
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {!drinks.isLoading && !drinks.isError && !drinks.data ? (
        <p className="text-center text-muted-foreground mt-8">
          Please select a beverage category above or search for its name.
        </p>
      ) : (
        !drinks.isError && drinks.data?.map((drink) => (
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
