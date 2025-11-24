import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { WaveBackground } from "@/components/ui/WaveBackground";

interface Props {
	children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
	return (
		<>
			<WaveBackground />
			<Header title="Cocktails & Drinks" />

			<div className="-mt-40 relative z-20 flex flex-wrap gap-4 px-4 sm:px-6 md:px-8">
				<main className="flex w-full justify-center">
					<div className="w-full rounded-2xl border border-white/50 bg-white/80 p-6 shadow-2xl backdrop-blur-sm sm:p-8 md:p-10">
						{children}
					</div>
				</main>
			</div>
		</>
	);
}
