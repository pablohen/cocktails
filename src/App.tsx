import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Routes } from "./routes";
import { GlobalContext } from "./stores";

function App() {
  const queryClient = new QueryClient();

  return (
    <HelmetProvider>
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
    </HelmetProvider>
  );
}

export default App;
