import { ReactNode } from 'react';
import { UtilsProvider } from './utils';

interface Props {
  children: ReactNode;
}

export function GlobalContext({ children }: Props) {
  return <UtilsProvider>{children}</UtilsProvider>;
}
