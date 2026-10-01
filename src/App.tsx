import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { RecentlyViewedProvider } from "./contexts/RecentlyViewedContext";
import { ShoppingListProvider } from "./contexts/ShoppingListContext";
import { AppThemeProvider } from "./contexts/ThemeContext";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { AppRoutes } from "./routes/app.routes";

function App() {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ScrollToTop />
				<AppThemeProvider>
					<RecentlyViewedProvider>
						<ShoppingListProvider>
							<FavoritesProvider>
								<DefaultLayout>
									<AppRoutes />
								</DefaultLayout>
							</FavoritesProvider>
						</ShoppingListProvider>
					</RecentlyViewedProvider>
				</AppThemeProvider>
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
