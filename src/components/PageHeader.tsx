import type { SvgIconComponent } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

interface Props {
	icon: SvgIconComponent;
	iconColor?: string;
	title: string;
	action?: ReactNode;
}

export function PageHeader({ icon: Icon, iconColor = "primary.main", title, action }: Props) {
	return (
		<Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 4 }}>
			<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
				<Avatar sx={{ bgcolor: iconColor, width: 48, height: 48 }}>
					<Icon />
				</Avatar>
				<Typography variant="h4" sx={{ fontWeight: 700 }}>
					{title}
				</Typography>
			</Stack>
			{action && <Box>{action}</Box>}
		</Stack>
	);
}
