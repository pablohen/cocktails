import { Button } from "@/components/ui/button";
import { useUtils } from "../../stores/utils";

interface Props {
  name: string;
  onClick: (categoryName: string) => void;
}

export function Category({ name, onClick }: Props) {
  const { selectedCategory } = useUtils();

  const handleClick = () => {
    onClick(name);
  };

  return (
    <Button
      onClick={handleClick}
      variant={name === selectedCategory ? "default" : "secondary"}
      className={`text-lg font-bold m-2 shadow-lg hover:shadow-xl transition-all ${
        name === selectedCategory
          ? "bg-yellow-400 hover:bg-yellow-300 text-gray-700"
          : ""
      }`}
    >
      {name}
    </Button>
  );
}
