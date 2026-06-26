import { Button } from "@/components/ui/button";
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
		<Button
			onClick={handleClick}
			variant={isSelected ? "default" : "secondary"}
			size="sm"
			className={`rounded-full font-semibold text-sm shadow-md transition-all duration-200 hover:shadow-lg sm:text-base ${
				isSelected
					? "scale-105 bg-white text-primary shadow-lg hover:bg-white/90"
					: "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
			}`}
		>
			{name}
		</Button>
	);
}
