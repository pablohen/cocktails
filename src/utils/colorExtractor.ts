import ColorThief from "colorthief";

const colorThief = new ColorThief();

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
				const palette = colorThief.getPalette(img, 3);

				const rgbToHex = (r: number, g: number, b: number) => {
					return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
				};

				resolve({
					primary: rgbToHex(...palette[0]),
					secondary: rgbToHex(...palette[1]),
					accent: rgbToHex(...palette[2]),
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
