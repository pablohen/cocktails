import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useCocktail } from '../hooks/useCocktail';

interface ParamsProps {
  drinkId?: string;
}

interface Props {}

const DrinkDetailsPage = (props: Props) => {
  const { drinkId } = useParams<ParamsProps>();
  const { drink, setSelectedDrink } = useCocktail();

  useEffect(() => {
    if (!!drinkId) {
      setSelectedDrink(drinkId);
    }
  }, [drinkId, setSelectedDrink]);

  return (
    <main className="w-full p-4">
      <h2 className="text-5xl mb-6">
        {drink.strDrink} ({drink.strCategory})
      </h2>

      <div className="flex flex-col sm:flex-row w-full sm:space-x-4">
        <div className="">
          <img
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            className="rounded"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <div className="">
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

          <div className="">
            <h2 className="text-4xl">Instructions:</h2>
            <p className="">{drink.strInstructions}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DrinkDetailsPage;
