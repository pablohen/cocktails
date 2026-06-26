import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
	icon: LucideIcon;
	title: string;
	description: string;
	action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: Props) {
	return (
		<div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
			<div className="rounded-full bg-muted p-6">
				<Icon className="h-12 w-12 text-muted-foreground" />
			</div>
			<h2 className="font-bold text-2xl">{title}</h2>
			<p className="max-w-md text-muted-foreground">{description}</p>
			{action}
		</div>
	);
}
