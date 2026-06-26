import type { SvgIconComponent } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

interface Props {
	icon: SvgIconComponent;
	title: string;
	description: string;
	action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: Props) {
	return (
		<Stack
			spacing={2}
			sx={{
				alignItems: "center",
				justifyContent: "center",
				py: 10,
				textAlign: "center",
			}}
		>
			<Avatar sx={{ bgcolor: "action.hover", width: 72, height: 72 }}>
				<Icon sx={{ fontSize: 40, color: "text.secondary" }} />
			</Avatar>
			<Typography variant="h5" sx={{ fontWeight: 700 }}>
				{title}
			</Typography>
			<Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
				{description}
			</Typography>
			{action && <Box sx={{ mt: 1 }}>{action}</Box>}
		</Stack>
	);
}
