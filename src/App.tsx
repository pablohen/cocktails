import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import GlobalContext from './context';
import DefaultLayout from './layouts/DefaultLayout';
import Routes from './routes';

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
    </QueryClientProvider>
  );
}

export default App;
