import Grid from "@mui/material/Grid";
import { Card } from "@/components/Card";
import type { DrinkSummary } from "@/lib/drink";

interface Props {
	drinks: DrinkSummary[];
}

export function DrinkGrid({ drinks }: Props) {
	return (
		<Grid container spacing={3}>
			{drinks.map((drink) => (
				<Grid key={drink.id} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
					<Card id={drink.id} name={drink.name} image={drink.image} />
				</Grid>
			))}
		</Grid>
	);
}
