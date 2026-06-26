import { Home, Search } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<>
			<Helmet>
				<title>404 - Page Not Found | Cocktails & Drinks</title>
			</Helmet>
			<div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
				<h1 className="mb-4 font-bold text-8xl">404</h1>
				<h2 className="mb-4 font-semibold text-3xl">Page Not Found</h2>
				<p className="mb-8 max-w-md text-lg text-muted-foreground">
					Sorry, we couldn't find the cocktail or page you're looking for. It
					might have been removed or the URL might be incorrect.
				</p>
				<div className="flex gap-4">
					<Button onClick={() => navigate("/")} size="lg">
						<Home className="mr-2 h-4 w-4" />
						Go Home
					</Button>
					<Button onClick={() => navigate("/")} variant="outline" size="lg">
						<Search className="mr-2 h-4 w-4" />
						Search Cocktails
					</Button>
				</div>
			</div>
		</>
	);
}
