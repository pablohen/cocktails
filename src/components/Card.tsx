import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useDynamicColors } from "@/contexts/ThemeContext";
import { extractColors } from "@/lib/colorExtractor";

interface Props {
	id: string;
	name: string;
	image: string;
	onClick: (id: string) => void;
}

export function Card({ id, name, image, onClick }: Props) {
	const { setColors } = useDynamicColors();

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
		<MuiCard
			sx={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				transition: "transform 0.2s, box-shadow 0.2s",
				"&:hover": {
					transform: "translateY(-4px)",
					boxShadow: 4,
				},
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
				<Box sx={{ position: "relative" }}>
					<CardMedia
						component="img"
						height={256}
						image={image}
						alt={`${name} cocktail`}
						loading="lazy"
					/>
					<FavoriteButton
						drink={{ idDrink: id, strDrink: name, strDrinkThumb: image }}
						sx={{ position: "absolute", top: 8, right: 8 }}
					/>
				</Box>
				<CardContent>
					<Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
						{name}
					</Typography>
				</CardContent>
			</CardActionArea>
		</MuiCard>
	);
}
