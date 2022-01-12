import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useCocktail } from '../../context/drinks';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import Thumbnail from './Thumbnail';
import Title from './Title';

interface ParamsProps {
  drinkId?: string;
}

interface Props {}

const DrinkDetailsPage = (props: Props) => {
  const { drinkId } = useParams<ParamsProps>();
  const { loading, drink, setSelectedDrink } = useCocktail();

  const pageTitle = `${drink.strDrink} (${drink.strCategory})`;

  useEffect(() => {
    if (!!drinkId) {
      setSelectedDrink(drinkId);
    }
  }, [drinkId, setSelectedDrink]);

  if (loading) return <p>Loading...</p>;

  return (
    <main className="w-full p-4">
      <Title value={pageTitle} />

      <div className="flex flex-col sm:flex-row w-full space-y-4 sm:space-x-4 sm:space-y-0">
        <div>
          <Thumbnail drink={drink} />
        </div>

        <div className="flex flex-col space-y-4">
          <Ingredients drink={drink} />
          <Instructions drink={drink} />
        </div>
      </div>
    </main>
  );
};

export default DrinkDetailsPage;
