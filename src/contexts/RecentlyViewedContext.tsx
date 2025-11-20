import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

export interface RecentDrink {
	id: string;
	name: string;
	image: string;
	timestamp: number;
}

interface RecentlyViewedContextType {
	recentDrinks: RecentDrink[];
	addToHistory: (drink: Omit<RecentDrink, "timestamp">) => void;
	clearHistory: () => void;
}

const RecentlyViewedContext = createContext<
	RecentlyViewedContextType | undefined
>(undefined);

export const RecentlyViewedProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [recentDrinks, setRecentDrinks] = useState<RecentDrink[]>(() => {
		const storedHistory = localStorage.getItem("recentlyViewed");
		return storedHistory ? JSON.parse(storedHistory) : [];
	});

	useEffect(() => {
		localStorage.setItem("recentlyViewed", JSON.stringify(recentDrinks));
	}, [recentDrinks]);

	const addToHistory = useCallback((drink: Omit<RecentDrink, "timestamp">) => {
		setRecentDrinks((prev) => {
			const newDrink = { ...drink, timestamp: Date.now() };
			const filtered = prev.filter((item) => item.id !== drink.id);
			return [newDrink, ...filtered].slice(0, 10);
		});
	}, []);

	const clearHistory = useCallback(() => {
		setRecentDrinks([]);
	}, []);

	const value = useMemo(
		() => ({
			recentDrinks,
			addToHistory,
			clearHistory,
		}),
		[recentDrinks, addToHistory, clearHistory],
	);

	return (
		<RecentlyViewedContext.Provider value={value}>
			{children}
		</RecentlyViewedContext.Provider>
	);
};

export const useRecentlyViewed = () => {
	const context = useContext(RecentlyViewedContext);
	if (context === undefined) {
		throw new Error(
			"useRecentlyViewed must be used within a RecentlyViewedProvider",
		);
	}
	return context;
};
