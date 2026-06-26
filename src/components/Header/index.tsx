import {
	AlertCircle,
	Coffee,
	Dices,
	Heart,
	History,
	ShoppingCart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Category } from "@/components/Category";
import { SearchBar } from "@/components/SearchBar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useShoppingList } from "@/contexts/ShoppingListContext";
import { useUtils } from "@/contexts/UtilsContext";
import { useCategories } from "@/hooks/useCategories";
import { useRandomDrink } from "@/hooks/useRandomDrink";

const CATEGORY_SKELETON_KEYS = [
	"category-skeleton-1",
	"category-skeleton-2",
	"category-skeleton-3",
	"category-skeleton-4",
	"category-skeleton-5",
	"category-skeleton-6",
] as const;

interface Props {
	title: string;
}

export function Header({ title }: Props) {
	const categories = useCategories();
	const { handleSelectedCategory, handleSearch, searchTerm } = useUtils();
	const { refetch, isFetching } = useRandomDrink();
	const { ingredients } = useShoppingList();
	const navigate = useNavigate();

	const handleSurpriseMe = async () => {
		const { data } = await refetch();
		if (data) {
			navigate(`/${data.idDrink}`);
		}
	};

	return (
		<div className="relative pt-6 pb-40 sm:pb-48 md:pb-52">
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

			<div className="absolute top-6 right-6 z-20 flex gap-2">
				<Link
					to="/favorites"
					className="rounded-full bg-white/10 p-3 backdrop-blur-md transition-colors hover:bg-white/20"
					aria-label="Go to favorites"
				>
					<Heart className="h-6 w-6 text-white" />
				</Link>

				<Link
					to="/shopping-list"
					className="relative rounded-full bg-white/10 p-3 backdrop-blur-md transition-colors hover:bg-white/20"
					aria-label="Go to shopping list"
				>
					<ShoppingCart className="h-6 w-6 text-white" />
					{ingredients.length > 0 && (
						<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-bold text-white text-xs">
							{ingredients.length}
						</span>
					)}
				</Link>

				<Link
					to="/recently-viewed"
					className="rounded-full bg-white/10 p-3 backdrop-blur-md transition-colors hover:bg-white/20"
					aria-label="Go to recently viewed"
				>
					<History className="h-6 w-6 text-white" />
				</Link>
			</div>

			<Button
				variant="ghost"
				size="icon"
				className="absolute top-6 left-6 z-20 h-12 w-12 rounded-full bg-white/10 p-0 backdrop-blur-md transition-colors hover:bg-white/20"
				onClick={handleSurpriseMe}
				disabled={isFetching}
				aria-label="Surprise me with a random cocktail"
			>
				<Dices
					className={`h-6 w-6 text-white ${isFetching ? "animate-spin" : ""}`}
				/>
			</Button>

			<nav className="relative z-10 min-h-[60px]" aria-label="Category filters">
				{categories.isLoading && (
					<div className="flex w-full flex-wrap items-center justify-center gap-2 px-2 sm:gap-3 sm:px-4">
						{CATEGORY_SKELETON_KEYS.map((key) => (
							<Skeleton
								key={key}
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
