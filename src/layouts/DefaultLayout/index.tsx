import type { ReactNode } from "react";
import { Header } from "@/components/Header";

interface Props {
  children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
  return (
    <>
      <Header title="Cocktails & Drinks" />

      <div className="flex flex-wrap px-4 sm:px-6 md:px-8 gap-4 -mt-40 relative z-20">
        <main className="flex w-full justify-center">
          <div className="w-full bg-white/80 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl border border-white/50">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
