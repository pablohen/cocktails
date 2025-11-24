import { useEffect, useState } from "react";

export function WaveBackground() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="overflow-h pointer-events-none pointer-events-none fixed inset-0 z-0 text-white">
			<svg
				className="absolute bottom-0 left-0 h-[50vh] min-h-[300px] w-full"
				viewBox="0 24 150 28"
				preserveAspectRatio="none"
				shapeRendering="auto"
			>
				<title>Wave Animation</title>
				<defs>
					<path
						id="gentle-wave"
						d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
					/>
				</defs>
				<g className="parallax">
					<use
						href="#gentle-wave"
						x="48"
						y="0"
						fill="currentColor"
						fillOpacity="0.7"
						className="animate-[wave_30s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite]"
					/>
					<use
						href="#gentle-wave"
						x="48"
						y="3"
						fill="currentColor"
						fillOpacity="0.5"
						className="animate-[wave_15s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite_delay-[-2s]]"
					/>
					<use
						href="#gentle-wave"
						x="48"
						y="5"
						fill="currentColor"
						fillOpacity="0.3"
						className="animate-[wave_10s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite_delay-[-4s]]"
					/>
					<use
						href="#gentle-wave"
						x="48"
						y="7"
						fill="currentColor"
						fillOpacity="0.1"
						className="animate-[wave_6s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite_delay-[-5s]]"
					/>
				</g>
			</svg>
			<style>{`
        @keyframes wave {
          0% {
            transform: translate3d(-90px, 0, 0);
          }
          100% {
            transform: translate3d(85px, 0, 0);
          }
        }
      `}</style>
		</div>
	);
}
