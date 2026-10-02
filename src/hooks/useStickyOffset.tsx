import { useEffect, useState } from "react";

const DEFAULT_APP_BAR_HEIGHT = 64;

export function useStickyOffset() {
	const [offset, setOffset] = useState(DEFAULT_APP_BAR_HEIGHT);

	useEffect(() => {
		const appBar = document.querySelector("header.MuiAppBar-root");
		if (!appBar) {
			return;
		}

		const observer = new ResizeObserver(() => {
			setOffset(appBar.getBoundingClientRect().height);
		});
		observer.observe(appBar);

		return () => observer.disconnect();
	}, []);

	return offset;
}
