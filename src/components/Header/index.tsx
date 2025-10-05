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
    <div className="bg-gradient-to-br from-primary via-secondary to-accent pt-6 pb-40 sm:pb-48 md:pb-52 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <Link to="/" aria-label="Go to homepage" className="relative z-10">
        <div className="flex flex-col w-full justify-center items-center py-6 sm:py-8 md:py-10">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl text-center font-bold px-4 drop-shadow-lg">
            {title}
          </h1>
          <Coffee
            className="text-4xl sm:text-5xl text-white mt-6 sm:mt-8 md:mt-10 drop-shadow-lg"
            size={56}
            aria-hidden="true"
          />
        </div>
      </Link>

      <nav className="min-h-[60px] relative z-10" aria-label="Category filters">
        {categories.isLoading && (
          <div className="flex justify-center items-center flex-wrap w-full px-2 sm:px-4 gap-2 sm:gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-9 sm:h-10 w-20 sm:w-24 bg-white/20 rounded-full" />
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
          <ul className="flex justify-center items-center flex-wrap w-full px-2 sm:px-4 gap-2 sm:gap-3">
            {categories.data.map((category) => (
              <li key={category.strCategory}>
                <Category name={category.strCategory} onClick={handleSelectedCategory} />
              </li>
            ))}
          </ul>
        )}
      </nav>

      <div className="flex w-full justify-center pt-6 sm:pt-8 px-4 relative z-10">
        <SearchBar initialValue={searchTerm} onSubmit={handleSearch} />
      </div>
    </div>
  );
}
