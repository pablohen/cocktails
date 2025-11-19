import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Routes } from "./routes";
import { GlobalContext } from "./stores";

function App() {
	const queryClient = new QueryClient();

	return (
		<HelmetProvider>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<ScrollToTop />
					<ThemeProvider>
						<FavoritesProvider>
							<GlobalContext>
								<DefaultLayout>
									<Routes />
								</DefaultLayout>
							</GlobalContext>
						</FavoritesProvider>
					</ThemeProvider>
				</BrowserRouter>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</HelmetProvider>
	);
}

export default App;
