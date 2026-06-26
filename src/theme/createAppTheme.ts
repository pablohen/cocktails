import { createTheme } from "@mui/material/styles";

export interface ThemeColors {
	primary: string;
	secondary: string;
	accent: string;
}

const STATIC_PRIMARY = "#9B4424";
const STATIC_SECONDARY = "#D4882B";
const STATIC_ACCENT = "#C45A1F";

const headingFont = '"Urbanist", sans-serif';
const bodyFont = '"Inter", sans-serif';

export function createAppTheme(dynamicColors?: ThemeColors | null) {
	const primary = dynamicColors?.primary ?? STATIC_PRIMARY;
	const secondary = dynamicColors?.secondary ?? STATIC_SECONDARY;
	const accent = dynamicColors?.accent ?? STATIC_ACCENT;

	return createTheme({
		palette: {
			mode: "light",
			primary: {
				main: primary,
				contrastText: "#FAFAF8",
			},
			secondary: {
				main: secondary,
				contrastText: "#FAFAF8",
			},
			accent: {
				main: accent,
				contrastText: "#FAFAF8",
			},
			error: {
				main: "#D4183D",
			},
			background: {
				default: "#FAFAF8",
				paper: "#FFFFFF",
			},
			text: {
				primary: "#332B28",
				secondary: "#7A7068",
			},
			divider: "#EBE8E4",
		},
		shape: {
			borderRadius: 12,
		},
		typography: {
			fontFamily: bodyFont,
			h1: { fontFamily: headingFont, fontWeight: 700 },
			h2: { fontFamily: headingFont, fontWeight: 700 },
			h3: { fontFamily: headingFont, fontWeight: 700 },
			h4: { fontFamily: headingFont, fontWeight: 700 },
			h5: { fontFamily: headingFont, fontWeight: 700 },
			h6: { fontFamily: headingFont, fontWeight: 700 },
			button: { fontFamily: bodyFont, textTransform: "none" },
		},
		components: {
			MuiButton: {
				defaultProps: {
					disableElevation: true,
				},
			},
			MuiAppBar: {
				defaultProps: {
					elevation: 1,
				},
			},
		},
	});
}
