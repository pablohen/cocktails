import { Home, Search } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 - Page Not Found | Cocktails & Drinks";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <h1 className="text-8xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Sorry, we couldn't find the cocktail or page you're looking for. It might have been removed
        or the URL might be incorrect.
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
  );
}
