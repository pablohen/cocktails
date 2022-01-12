import DrinksList from '../../components/DrinksList';
import { useCocktail } from '../../context/drinks';

interface Props {}

const HomePage = (props: Props) => {
  const { loading, drinks } = useCocktail();

  return (
    <div className="flex justify-center flex-wrap">
      {loading ? <p>Loading...</p> : <DrinksList drinks={drinks} />}
    </div>
  );
};

export default HomePage;
