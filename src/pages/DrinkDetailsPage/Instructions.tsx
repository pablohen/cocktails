import { DrinkDTO } from '../../interfaces/DrinkDTO';

interface Props {
  drink: DrinkDTO;
}

export function Instructions({ drink }: Props) {
  return (
    <div>
      <h2 className="text-4xl">Instructions:</h2>
      <p>{drink.strInstructions}</p>
    </div>
  );
}
