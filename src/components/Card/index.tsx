import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	CardContent,
	CardFooter,
	Card as ShadCard,
} from "@/components/ui/card";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useTheme } from "@/contexts/ThemeContext";
import { extractColors } from "@/utils/colorExtractor";

interface Props {
	id: string;
	name: string;
	image: string;
	onClick: (id: string) => void;
}

export function Card({ id, name, image, onClick }: Props) {
	const { setColors } = useTheme();
	const { addFavorite, removeFavorite, isFavorite } = useFavorites();

	const handleClick = () => {
		onClick(id);
	};

	const handleMouseEnter = async () => {
		try {
			const colors = await extractColors(image);
			setColors(colors);
		} catch (error) {
			console.error("Failed to extract colors:", error);
		}
	};

	const handleMouseLeave = () => {
		setColors(null);
	};

	return (
		<ShadCard
			className="group hover:-translate-y-3 mb-4 cursor-pointer break-inside-avoid overflow-hidden border-2 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm transition-all duration-300 ease-in-out hover:border-primary/30 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					handleClick();
				}
			}}
			aria-label={`View details for ${name}`}
		>
			<CardContent className="relative overflow-hidden p-0">
				<div className="absolute inset-0 z-10 bg-gradient-to-t from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
				<img
					src={image}
					alt={`${name} cocktail`}
					loading="lazy"
					className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
				/>
				<Button
					variant="ghost"
					size="icon"
					className="absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-black/40 hover:text-red-500"
					onClick={(e) => {
						e.stopPropagation();
						if (isFavorite(id)) {
							removeFavorite(id);
						} else {
							addFavorite({
								idDrink: id,
								strDrink: name,
								strDrinkThumb: image,
							});
						}
					}}
				>
					<Heart
						className={`h-5 w-5 transition-all ${
							isFavorite(id) ? "fill-red-500 text-red-500" : ""
						}`}
					/>
				</Button>
			</CardContent>
			<CardFooter className="relative bg-gradient-to-br from-primary via-secondary to-accent p-4">
				<div className="absolute inset-0 bg-black/40" />
				<span className="relative z-10 w-full truncate font-bold text-lg text-white drop-shadow-md">
					{name}
				</span>
			</CardFooter>
		</ShadCard>
	);
}
