import Box from "@mui/material/Box";
import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export function DrinkGrid({ children }: Props) {
	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: {
					xs: "repeat(auto-fill, minmax(min(100%, 150px), 1fr))",
					sm: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
				},
				gap: { xs: 1.5, sm: 2.25 },
			}}
		>
			{children}
		</Box>
	);
}
