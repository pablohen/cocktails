import { Routes, Route } from 'react-router-dom';
import { DrinkDetailsPage } from '../pages/DrinkDetailsPage';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:drinkId" element={<DrinkDetailsPage />} />
      <Route element={<NotFoundPage />} />
    </Routes>
  );
}
