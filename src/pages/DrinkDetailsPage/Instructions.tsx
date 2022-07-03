import { DrinkDTO } from "../../interfaces/DrinkDTO";

interface Props {
  drink: DrinkDTO;
}

export function Instructions({ drink }: Props) {
  return (
    <div>
      <h2 className="text-xl md:text-4xl mb-2">Instructions:</h2>
      <p>{drink.strInstructions}</p>
    </div>
  );
}
