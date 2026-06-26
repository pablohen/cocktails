import { Heart } from "lucide-react";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { cn } from "@/lib/utils";
import type { Drink } from "@/types/Drink";

type FavoriteDrink = Pick<Drink, "idDrink" | "strDrink" | "strDrinkThumb">;

interface Props {
	drink: FavoriteDrink;
	size?: "sm" | "md";
	className?: string;
	onClick?: (e: MouseEvent) => void;
}

const sizeClasses = {
	sm: "h-8 w-8",
	md: "h-10 w-10",
} as const;

const iconSizeClasses = {
	sm: "h-5 w-5",
	md: "h-6 w-6",
} as const;

export function FavoriteButton({
	drink,
	size = "sm",
	className,
	onClick,
}: Props) {
	const { addFavorite, removeFavorite, isFavorite } = useFavorites();
	const favorited = isFavorite(drink.idDrink);

	const handleClick = (e: MouseEvent) => {
		e.stopPropagation();
		onClick?.(e);
		if (favorited) {
			removeFavorite(drink.idDrink);
		} else {
			addFavorite(drink);
		}
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			className={cn(
				"rounded-full bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-black/40 hover:text-red-500",
				sizeClasses[size],
				className,
			)}
			onClick={handleClick}
			aria-label={
				favorited
					? `Remove ${drink.strDrink} from favorites`
					: `Add ${drink.strDrink} to favorites`
			}
		>
			<Heart
				className={cn(
					iconSizeClasses[size],
					"transition-all",
					favorited && "fill-red-500 text-red-500",
				)}
			/>
		</Button>
	);
}
