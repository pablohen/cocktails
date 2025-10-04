import { ReactNode } from "react";
import { Header } from "@/components/Header";

interface Props {
  children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
  return (
    <>
      <Header title="Cocktails & Drinks" />

      <div className="flex flex-wrap px-4 sm:px-6 md:px-8 gap-4 -mt-40">
        <main className="flex w-full justify-center">
          <div className="w-full bg-yellow-200 p-4 sm:p-6 md:p-8 rounded">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
