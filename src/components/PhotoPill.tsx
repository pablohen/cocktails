import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { alpha } from "@mui/material/styles";
import type { ReactNode } from "react";
import { useState } from "react";

interface Props {
	label: string;
	image?: string | null;
	icon?: ReactNode;
	selected: boolean;
	onClick: () => void;
}

export function PhotoPill({ label, image, icon, selected, onClick }: Props) {
	const [imageFailed, setImageFailed] = useState(false);
	const showImage = !!image && !imageFailed;
	const hasLeading = showImage || !!icon;

	return (
		<ButtonBase
			onClick={onClick}
			aria-pressed={selected}
			sx={(theme) => ({
				display: "inline-flex",
				alignItems: "center",
				gap: 1,
				height: 40,
				pl: hasLeading ? 0.5 : 1.75,
				pr: 1.75,
				borderRadius: 999,
				border: 1,
				borderColor: selected ? "primary.main" : "divider",
				bgcolor: selected ? "primary.main" : "background.paper",
				color: selected ? "primary.contrastText" : "text.primary",
				fontSize: "0.875rem",
				fontWeight: 600,
				whiteSpace: "nowrap",
				transition: "transform 0.15s, box-shadow 0.15s, background-color 0.15s",
				"&:hover": { transform: "translateY(-1px)", boxShadow: 2 },
				"&.Mui-focusVisible": {
					outline: `2px solid ${theme.palette.primary.main}`,
					outlineOffset: 2,
				},
			})}
		>
			{hasLeading && (
				<Box
					sx={(theme) => ({
						width: 28,
						height: 28,
						flex: "none",
						borderRadius: "50%",
						overflow: "hidden",
						display: "grid",
						placeItems: "center",
						bgcolor: selected
							? alpha(theme.palette.common.white, 0.2)
							: alpha(theme.palette.primary.main, 0.12),
						"& svg": { fontSize: 18 },
					})}
				>
					{showImage ? (
						<Box
							component="img"
							src={image}
							alt=""
							loading="lazy"
							onError={() => setImageFailed(true)}
							sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
						/>
					) : (
						icon
					)}
				</Box>
			)}
			{label}
		</ButtonBase>
	);
}
