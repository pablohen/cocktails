import { DrinkDTO } from "../../interfaces/DrinkDTO";

interface Props {
  drink: DrinkDTO;
}

export function Ingredients({ drink }: Props) {
  const ingredients = Object.entries(drink).filter((item) =>
    item[0].startsWith("strIngredient")
  );

  return (
    <div>
      <h2 className="text-xl md:text-4xl mb-2">Ingredients:</h2>

      <>
        {ingredients.map((ingredient) => {
          return <p key={ingredient[0]}>{ingredient[1]}</p>;
        })}
      </>
    </div>
  );
}
