import { AlertCircle, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import { Category } from "@/components/Category";
import { SearchBar } from "@/components/SearchBar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useCocktails } from "@/hooks/useCocktails";
import { useUtils } from "@/stores/utils";

interface Props {
  title: string;
}

export function Header({ title }: Props) {
  const { categories } = useCocktails();
  const { handleSelectedCategory, handleSearch, searchTerm } = useUtils();

  return (
    <div className="bg-yellow-500 pt-4 pb-36 sm:pb-44 md:pb-48">
      <Link to="/" aria-label="Go to homepage">
        <div className="flex flex-col w-full justify-center items-center py-4 sm:py-6 md:py-8">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl text-center font-bold px-4">
            {title}
          </h1>
          <Coffee
            className="text-3xl sm:text-4xl text-white mt-4 sm:mt-6 md:mt-8"
            aria-hidden="true"
          />
        </div>
      </Link>

      <nav className="min-h-[60px]" aria-label="Category filters">
        {categories.isLoading && (
          <div className="flex justify-center items-center flex-wrap w-full px-2 sm:px-4 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-9 sm:h-10 w-20 sm:w-24 bg-white/20" />
            ))}
          </div>
        )}

        {categories.isError && (
          <div className="flex justify-center px-4">
            <Alert variant="destructive" className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Failed to load categories</AlertDescription>
            </Alert>
          </div>
        )}

        {categories.data && (
          <ul className="flex justify-center items-center flex-wrap w-full px-2 sm:px-4 gap-1 sm:gap-2">
            {categories.data.map((category) => (
              <li key={category.strCategory}>
                <Category name={category.strCategory} onClick={handleSelectedCategory} />
              </li>
            ))}
          </ul>
        )}
      </nav>

      <div className="flex w-full justify-center pt-4 sm:pt-6 px-4">
        <SearchBar initialValue={searchTerm} onSubmit={handleSearch} />
      </div>
    </div>
  );
}
