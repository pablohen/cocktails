import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
	icon: LucideIcon;
	iconClassName?: string;
	title: string;
	action?: ReactNode;
}

export function PageHeader({
	icon: Icon,
	iconClassName,
	title,
	action,
}: Props) {
	return (
		<div className="mb-8 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div
					className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg ${iconClassName ?? ""}`}
				>
					<Icon className="h-6 w-6 text-white" />
				</div>
				<h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text font-bold text-3xl text-transparent sm:text-4xl md:text-5xl">
					{title}
				</h1>
			</div>
			{action}
		</div>
	);
}
