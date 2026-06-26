import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<>
			<Helmet>
				<title>404 - Page Not Found | Cocktails & Drinks</title>
			</Helmet>
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
				<Typography
					variant="body1"
					color="text.secondary"
					sx={{ maxWidth: 400, mb: 2 }}
				>
					Sorry, we couldn't find the cocktail or page you're looking for. It
					might have been removed or the URL might be incorrect.
				</Typography>
				<Stack direction="row" spacing={2}>
					<Button
						variant="contained"
						size="large"
						startIcon={<HomeIcon />}
						onClick={() => navigate("/")}
					>
						Go Home
					</Button>
					<Button
						variant="outlined"
						size="large"
						startIcon={<SearchIcon />}
						onClick={() => navigate("/")}
					>
						Search Cocktails
					</Button>
				</Stack>
			</Stack>
		</>
	);
}
