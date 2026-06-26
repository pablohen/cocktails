import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function ErrorDisplay() {
	return (
		<Alert
			severity="error"
			sx={{ maxWidth: 600 }}
			action={
				<Button
					color="inherit"
					size="small"
					onClick={() => window.location.reload()}
				>
					Retry
				</Button>
			}
		>
			<AlertTitle>Error loading drinks</AlertTitle>
			<Typography variant="body2">
				We couldn't load the drinks. Please try again.
			</Typography>
		</Alert>
	);
}
