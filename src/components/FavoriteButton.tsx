import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import type { MouseEvent } from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import type { Drink } from "@/types/Drink";

type FavoriteDrink = Pick<Drink, "idDrink" | "strDrink" | "strDrinkThumb">;

interface Props {
	drink: FavoriteDrink;
	size?: "sm" | "md";
	sx?: SxProps<Theme>;
	onClick?: (e: MouseEvent) => void;
}

const sizeMap = {
	sm: "small",
	md: "medium",
} as const;

export function FavoriteButton({ drink, size = "sm", sx, onClick }: Props) {
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
		<IconButton
			size={sizeMap[size]}
			onClick={handleClick}
			aria-label={
				favorited ? `Remove ${drink.strDrink} from favorites` : `Add ${drink.strDrink} to favorites`
			}
			sx={{
				bgcolor: "rgba(0,0,0,0.4)",
				color: favorited ? "error.main" : "common.white",
				"&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
				...sx,
			}}
		>
			{favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
		</IconButton>
	);
}
