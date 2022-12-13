import { createBrowserRouter, RouteObject } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { DrinkDetails } from "../pages/DrinkDetails";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";

const drinkRoutes = [
  { path: ":id", element: <DrinkDetails /> },
] as RouteObject[];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "drinks",
        children: drinkRoutes,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
