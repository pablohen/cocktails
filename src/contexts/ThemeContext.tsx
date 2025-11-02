import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

interface ThemeColors {
	primary: string;
	secondary: string;
	accent: string;
}

interface ThemeContextType {
	colors: ThemeColors | null;
	setColors: (colors: ThemeColors | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [colors, setColors] = useState<ThemeColors | null>(null);

	useEffect(() => {
		const body = document.body;
		if (colors) {
			document.documentElement.style.setProperty(
				"--dynamic-primary",
				colors.primary,
			);
			document.documentElement.style.setProperty(
				"--dynamic-secondary",
				colors.secondary,
			);
			document.documentElement.style.setProperty(
				"--dynamic-accent",
				colors.accent,
			);
			body.setAttribute("data-dynamic-theme", "true");
		} else {
			document.documentElement.style.removeProperty("--dynamic-primary");
			document.documentElement.style.removeProperty("--dynamic-secondary");
			document.documentElement.style.removeProperty("--dynamic-accent");
			body.removeAttribute("data-dynamic-theme");
		}
	}, [colors]);

	return (
		<ThemeContext.Provider value={{ colors, setColors }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
