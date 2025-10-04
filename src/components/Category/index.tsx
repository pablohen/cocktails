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
      onClick('');
    } else {
      onClick(name);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={isSelected ? "default" : "secondary"}
      size="sm"
      className={`text-sm sm:text-base md:text-lg font-bold m-1 sm:m-2 shadow-lg hover:shadow-xl transition-all ${
        isSelected
          ? "bg-yellow-400 hover:bg-yellow-300 text-gray-700"
          : ""
      }`}
    >
      {name}
    </Button>
  );
}
