import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Accent = "primary" | "secondary" | "accent";

interface Props {
	title: string;
	accent: Accent;
	children: ReactNode;
	className?: string;
}

const accentBarClasses: Record<Accent, string> = {
	primary: "bg-gradient-to-b from-primary to-secondary",
	secondary: "bg-gradient-to-b from-secondary to-accent",
	accent: "bg-gradient-to-b from-accent to-primary",
};

const titleColorClasses: Record<Accent, string> = {
	primary: "text-primary",
	secondary: "text-secondary",
	accent: "text-accent",
};

export function DetailSection({ title, accent, children, className }: Props) {
	return (
		<Card
			className={cn(
				"border border-border bg-gradient-to-br from-card to-card/80 shadow-lg",
				className,
			)}
		>
			<CardHeader className="p-6 pb-0">
				<CardTitle
					className={cn(
						"flex items-center gap-2 font-bold text-xl sm:text-2xl md:text-3xl",
						titleColorClasses[accent],
					)}
				>
					<span
						className={cn("h-8 w-1 rounded-full", accentBarClasses[accent])}
					/>
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className="p-6 pt-3">{children}</CardContent>
		</Card>
	);
}
