import Chip from "@mui/material/Chip";
import { useUtils } from "@/contexts/UtilsContext";

interface Props {
	name: string;
	onClick: (categoryName: string) => void;
}

export function Category({ name, onClick }: Props) {
	const { selectedCategory } = useUtils();
	const isSelected = name === selectedCategory;

	const handleClick = () => {
		if (isSelected) {
			onClick("");
		} else {
			onClick(name);
		}
	};

	return (
		<Chip
			label={name}
			onClick={handleClick}
			color={isSelected ? "default" : "primary"}
			variant={isSelected ? "filled" : "outlined"}
			sx={
				isSelected
					? { bgcolor: "background.paper", color: "primary.main" }
					: { borderColor: "rgba(255,255,255,0.5)", color: "inherit" }
			}
		/>
	);
}
