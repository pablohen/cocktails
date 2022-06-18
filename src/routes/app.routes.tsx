import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import DrinkDetailsPage from '../pages/DrinkDetailsPage';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/details/:drinkId" element={<DrinkDetailsPage />} />
      <Route element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
