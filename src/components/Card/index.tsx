import { Card as ShadCard, CardContent, CardFooter } from "@/components/ui/card";

interface Props {
  id: string;
  name: string;
  image: string;
  onClick: (id: string) => void;
}

export function Card({ id, name, image, onClick }: Props) {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <ShadCard
      className="w-64 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2 overflow-hidden"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover"
        />
      </CardContent>
      <CardFooter className="bg-black/80 p-4">
        <span className="text-white font-bold">{name}</span>
      </CardFooter>
    </ShadCard>
  );
}
