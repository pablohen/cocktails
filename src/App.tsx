import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Routes } from './routes';
import { ReactQueryDevtools } from 'react-query/devtools';
import { GlobalContext } from './stores';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalContext>
          <DefaultLayout>
            <Routes />
          </DefaultLayout>
        </GlobalContext>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
