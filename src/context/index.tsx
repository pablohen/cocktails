import { ReactNode } from 'react';
import { CocktailProvider } from '../hooks/useCocktail';

interface Props {
  children: ReactNode;
}

const GlobalContext = ({ children }: Props) => {
  return <CocktailProvider>{children}</CocktailProvider>;
};

export default GlobalContext;
