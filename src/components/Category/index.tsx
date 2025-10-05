import { Button } from "@/components/ui/button";
import { useUtils } from "@/stores/utils";

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
      className={`text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 rounded-full ${
        isSelected
          ? "bg-white text-primary hover:bg-white/90 scale-105 shadow-lg"
          : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
      }`}
    >
      {name}
    </Button>
  );
}
