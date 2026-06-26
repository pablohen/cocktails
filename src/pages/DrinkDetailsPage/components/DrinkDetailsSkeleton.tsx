import { DetailSection } from "@/components/DetailSection";
import { Skeleton } from "@/components/ui/skeleton";

export function DrinkDetailsSkeleton() {
	return (
		<div className="w-full">
			<Skeleton className="mb-6 h-12 w-64 rounded-xl sm:mb-8" />

			<div className="flex w-full flex-col gap-6 sm:gap-8 md:gap-12 lg:flex-row">
				<div className="flex flex-shrink-0 justify-center lg:justify-start">
					<div className="relative">
						<div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-50 blur-lg" />
						<Skeleton className="relative aspect-square h-auto w-full max-w-[320px] rounded-2xl sm:max-w-[400px] lg:max-w-[480px]" />
					</div>
				</div>

				<div className="flex flex-1 flex-col gap-6 sm:gap-8">
					<DetailSection title="Category" accent="primary">
						<Skeleton className="h-6 w-48 rounded-lg" />
					</DetailSection>

					<DetailSection title="Ingredients" accent="secondary">
						<div className="space-y-2">
							<Skeleton className="h-6 w-40 rounded-lg" />
							<Skeleton className="h-6 w-36 rounded-lg" />
							<Skeleton className="h-6 w-44 rounded-lg" />
						</div>
					</DetailSection>

					<DetailSection title="Instructions" accent="accent">
						<Skeleton className="h-24 w-full rounded-lg" />
					</DetailSection>
				</div>
			</div>
		</div>
	);
}
