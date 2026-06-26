import { getPaletteSync } from "colorthief";

export async function extractColors(imageUrl: string): Promise<{
	primary: string;
	secondary: string;
	accent: string;
}> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = "Anonymous";

		img.onload = () => {
			try {
				const palette = getPaletteSync(img, { colorCount: 3 });
				if (!palette || palette.length < 3) {
					reject(new Error("Failed to extract colors"));
					return;
				}

				resolve({
					primary: palette[0].hex(),
					secondary: palette[1].hex(),
					accent: palette[2].hex(),
				});
			} catch (error) {
				reject(error);
			}
		};

		img.onerror = () => {
			reject(new Error("Failed to load image"));
		};

		img.src = imageUrl;
	});
}
