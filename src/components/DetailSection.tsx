import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

type Accent = "primary" | "secondary" | "accent";

interface Props {
	title: string;
	accent: Accent;
	children: ReactNode;
	sx?: SxProps<Theme>;
}

const accentColorMap: Record<Accent, string> = {
	primary: "primary.main",
	secondary: "secondary.main",
	accent: "accent.main",
};

export function DetailSection({ title, accent, children, sx }: Props) {
	const color = accentColorMap[accent];

	return (
		<Paper variant="outlined" sx={{ p: 3, ...sx }}>
			<Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
				<Box
					sx={{
						width: 4,
						height: 32,
						borderRadius: 2,
						bgcolor: color,
					}}
				/>
				<Typography variant="h6" sx={{ fontWeight: 700, color }}>
					{title}
				</Typography>
			</Stack>
			{children}
		</Paper>
	);
}
