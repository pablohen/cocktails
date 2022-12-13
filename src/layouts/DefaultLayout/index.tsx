import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

export function DefaultLayout() {
  return (
    <>
      <Header title="Cocktails & Drinks" />

      <div className="flex flex-wrap p-4 gap-4 -mt-44">
        <main className="flex w-full justify-center">
          <div className="w-full bg-yellow-200 p-8 rounded">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
