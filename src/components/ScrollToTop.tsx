import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
	const { pathname } = useLocation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: false positive
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
