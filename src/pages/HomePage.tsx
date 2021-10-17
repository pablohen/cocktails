import DrinksList from '../components/DrinksList';
import { useCocktail } from '../hooks/useCocktail';

interface Props {}

const HomePage = (props: Props) => {
  const { drinks, drink, isSelectedDrink } = useCocktail();

  return (
    <>
      <DrinksList drinks={drinks} />

      <main className="flex flex-grow">
        {isSelectedDrink && <p>{drink.strDrink}</p>}
      </main>
    </>
  );
};

export default HomePage;
