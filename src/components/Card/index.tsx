import { CardContent, CardFooter, Card as ShadCard } from "@/components/ui/card";
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
      className="group break-inside-avoid mb-4 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-3 hover:shadow-2xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-2 hover:border-primary/30"
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
      <CardContent className="p-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <img
          src={image}
          alt={`${name} cocktail`}
          loading="lazy"
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </CardContent>
      <CardFooter className="bg-gradient-to-br from-primary via-secondary to-accent p-4 relative">
        <div className="absolute inset-0 bg-black/40" />
        <span className="text-white font-bold text-lg relative z-10 drop-shadow-md truncate w-full">
          {name}
        </span>
      </CardFooter>
    </ShadCard>
  );
}
