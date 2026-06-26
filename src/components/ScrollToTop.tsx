import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
	const { pathname } = useLocation();

	// oxlint-disable-next-line react-hooks/exhaustive-deps -- scroll on route change only
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
