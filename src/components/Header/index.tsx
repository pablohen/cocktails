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
		<div className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent pt-6 pb-40 sm:pb-48 md:pb-52">
			<div className="absolute inset-0 bg-black/10" />
			<div className="-translate-y-1/2 absolute top-0 right-0 h-96 w-96 translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
			<div className="-translate-x-1/2 absolute bottom-0 left-0 h-96 w-96 translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

			<Link to="/" aria-label="Go to homepage" className="relative z-10">
				<div className="flex w-full flex-col items-center justify-center py-6 sm:py-8 md:py-10">
					<h1 className="px-4 text-center font-bold text-4xl text-white drop-shadow-lg sm:text-5xl md:text-6xl">
						{title}
					</h1>
					<Coffee
						className="mt-6 text-4xl text-white drop-shadow-lg sm:mt-8 sm:text-5xl md:mt-10"
						size={56}
						aria-hidden="true"
					/>
				</div>
			</Link>

			<nav className="relative z-10 min-h-[60px]" aria-label="Category filters">
				{categories.isLoading && (
					<div className="flex w-full flex-wrap items-center justify-center gap-2 px-2 sm:gap-3 sm:px-4">
						{Array.from({ length: 6 }).map(() => (
							<Skeleton
								key={crypto.randomUUID()}
								className="h-9 w-20 rounded-full bg-white/20 sm:h-10 sm:w-24"
							/>
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
					<ul className="flex w-full flex-wrap items-center justify-center gap-2 px-2 sm:gap-3 sm:px-4">
						{categories.data.map((category) => (
							<li key={category.strCategory}>
								<Category
									name={category.strCategory}
									onClick={handleSelectedCategory}
								/>
							</li>
						))}
					</ul>
				)}
			</nav>

			<div className="relative z-10 flex w-full justify-center px-4 pt-6 sm:pt-8">
				<SearchBar initialValue={searchTerm} onSubmit={handleSearch} />
			</div>
		</div>
	);
}
