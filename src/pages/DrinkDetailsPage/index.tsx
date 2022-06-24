import { useParams } from 'react-router';
import { useDrink } from '../../hooks/useDrink';
import { Ingredients } from './Ingredients';
import { Instructions } from './Instructions';
import { Thumbnail } from './Thumbnail';
import { Title } from './Title';

export function DrinkDetailsPage() {
  const { drinkId } = useParams();
  const { drink } = useDrink(drinkId!);

  return (
    <main className="w-full">
      {drink.isLoading && <p className="text-center">Loading...</p>}

      {drink.data && (
        <div className="p-4">
          <Title value={`${drink.data.strDrink} (${drink.data.strCategory})`} />

          <div className="flex flex-col sm:flex-row w-full space-y-4 sm:space-x-4 sm:space-y-0">
            <div>
              <Thumbnail drink={drink.data} />
            </div>

            <div className="flex flex-col space-y-4">
              <Ingredients drink={drink.data} />
              <Instructions drink={drink.data} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
