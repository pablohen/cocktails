import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import {
	createContext,
	type ReactNode,
	useContext,
	useMemo,
	useState,
} from "react";
import { createAppTheme, type ThemeColors } from "@/theme/createAppTheme";

interface DynamicColorsContextType {
	colors: ThemeColors | null;
	setColors: (colors: ThemeColors | null) => void;
}

const DynamicColorsContext = createContext<
	DynamicColorsContextType | undefined
>(undefined);

export function AppThemeProvider({ children }: { children: ReactNode }) {
	const [colors, setColors] = useState<ThemeColors | null>(null);
	const theme = useMemo(() => createAppTheme(colors), [colors]);

	return (
		<DynamicColorsContext.Provider value={{ colors, setColors }}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MuiThemeProvider>
		</DynamicColorsContext.Provider>
	);
}

export function useDynamicColors() {
	const context = useContext(DynamicColorsContext);
	if (context === undefined) {
		throw new Error("useDynamicColors must be used within AppThemeProvider");
	}
	return context;
}
