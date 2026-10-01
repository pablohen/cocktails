import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export function NotFoundPage() {
	return (
		<>
			<title>404 - Page Not Found | Cocktails & Drinks</title>
			<Stack
				spacing={2}
				sx={{
					alignItems: "center",
					justifyContent: "center",
					minHeight: "60vh",
					py: 8,
					textAlign: "center",
				}}
			>
				<Typography variant="h1" sx={{ fontWeight: 700 }}>
					404
				</Typography>
				<Typography variant="h4" sx={{ fontWeight: 600 }}>
					Page Not Found
				</Typography>
				<Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mb: 2 }}>
					Sorry, we couldn't find the cocktail or page you're looking for. It might have been
					removed or the URL might be incorrect.
				</Typography>
				<Button component={Link} to="/" variant="contained" size="large" startIcon={<HomeIcon />}>
					Go Home
				</Button>
			</Stack>
		</>
	);
}
