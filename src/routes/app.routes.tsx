import { Switch, Route } from 'react-router-dom';
import DrinkDetailsPage from '../pages/DrinkDetailsPage';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
interface Props {}

const AppRoutes = (props: Props) => {
  return (
    <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/details/:drinkId" component={DrinkDetailsPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default AppRoutes;
