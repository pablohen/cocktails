import Container from "@mui/material/Container";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";

interface Props {
	children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
	return (
		<>
			<Header title="Cocktails & Drinks" />
			<Container component="main" maxWidth="lg" sx={{ py: 4 }}>
				{children}
			</Container>
		</>
	);
}
