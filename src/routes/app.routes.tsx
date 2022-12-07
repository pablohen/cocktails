import { Route, Routes } from "react-router-dom";
import { DrinkDetails } from "../pages/DrinkDetails";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:drinkId" element={<DrinkDetails />} />
      <Route element={<NotFound />} />
    </Routes>
  );
}
