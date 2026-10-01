import MuiCard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useDynamicColors } from "@/contexts/ThemeContext";
import { extractColors } from "@/lib/colorExtractor";

interface Props {
	id: string;
	name: string;
	image: string;
}

export function Card({ id, name, image }: Props) {
	const { setColors } = useDynamicColors();
	const isHovered = useRef(false);

	const handleMouseEnter = async () => {
		isHovered.current = true;
		try {
			const colors = await extractColors(image);
			if (isHovered.current) setColors(colors);
		} catch (error) {
			console.error("Failed to extract colors:", error);
		}
	};

	const handleMouseLeave = () => {
		isHovered.current = false;
		setColors(null);
	};

	return (
		<MuiCard
			sx={{
				position: "relative",
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
			<CardActionArea component={Link} to={`/${id}`} sx={{ flexGrow: 1 }}>
				<CardMedia
					component="img"
					height={256}
					image={image}
					alt={`${name} cocktail`}
					loading="lazy"
				/>
				<CardContent>
					<Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
						{name}
					</Typography>
				</CardContent>
			</CardActionArea>
			<FavoriteButton
				drink={{ idDrink: id, strDrink: name, strDrinkThumb: image }}
				sx={{ position: "absolute", top: 8, right: 8 }}
			/>
		</MuiCard>
	);
}
