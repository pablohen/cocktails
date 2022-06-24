import { ReactNode } from 'react';
import { Header } from '../../components/Header';

interface Props {
  children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
  return (
    <>
      <Header title="Cocktails & Drinks" />

      <div className="flex flex-wrap p-4 space-x-4 -mt-44">
        <main className="flex w-full justify-center">
          <div className="w-full bg-yellow-200 p-2 rounded">{children}</div>
        </main>
      </div>
    </>
  );
}