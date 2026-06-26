import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { RecentlyViewedProvider } from "./contexts/RecentlyViewedContext";
import { ShoppingListProvider } from "./contexts/ShoppingListContext";
import { AppThemeProvider } from "./contexts/ThemeContext";
import { UtilsProvider } from "./contexts/UtilsContext";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Routes } from "./routes/Routes";

function App() {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<HelmetProvider>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<ScrollToTop />
					<AppThemeProvider>
						<RecentlyViewedProvider>
							<ShoppingListProvider>
								<FavoritesProvider>
									<UtilsProvider>
										<DefaultLayout>
											<Routes />
										</DefaultLayout>
									</UtilsProvider>
								</FavoritesProvider>
							</ShoppingListProvider>
						</RecentlyViewedProvider>
					</AppThemeProvider>
				</BrowserRouter>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</HelmetProvider>
	);
}

export default App;
