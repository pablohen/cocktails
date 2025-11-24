import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function ErrorDisplay() {
	return (
		<div className="w-full max-w-2xl">
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Error loading drinks</AlertTitle>
				<AlertDescription className="flex flex-col gap-2">
					<p>We couldn't load the drinks. Please try again.</p>
					<Button
						variant="outline"
						size="sm"
						onClick={() => window.location.reload()}
						className="w-fit"
					>
						Retry
					</Button>
				</AlertDescription>
			</Alert>
		</div>
	);
}
