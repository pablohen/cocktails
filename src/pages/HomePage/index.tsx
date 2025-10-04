import { Card } from "../../components/Card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCocktails } from "../../hooks/useCocktails";
import { useUtils } from "../../stores/utils";

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

      {!drinks.isLoading && !drinks.data ? (
        <p className="text-center text-muted-foreground mt-8">
          Please select a beverage category above or search for its name.
        </p>
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
