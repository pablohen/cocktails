import { DrinkDTO } from '../../interfaces/DrinkDTO';

interface Props {
  drink: DrinkDTO;
}

const Ingredients = ({ drink }: Props) => {
  return (
    <div>
      <h2 className="text-4xl">Ingredients:</h2>
      <p className="">{drink.strIngredient1}</p>
      <p className="">{drink.strIngredient2}</p>
      <p className="">{drink.strIngredient3}</p>
      <p className="">{drink.strIngredient4}</p>
      <p className="">{drink.strIngredient5}</p>
      <p className="">{drink.strIngredient6}</p>
      <p className="">{drink.strIngredient7}</p>
      <p className="">{drink.strIngredient8}</p>
      <p className="">{drink.strIngredient9}</p>
      <p className="">{drink.strIngredient10}</p>
      <p className="">{drink.strIngredient11}</p>
      <p className="">{drink.strIngredient12}</p>
      <p className="">{drink.strIngredient13}</p>
      <p className="">{drink.strIngredient14}</p>
      <p className="">{drink.strIngredient15}</p>
    </div>
  );
};

export default Ingredients;
