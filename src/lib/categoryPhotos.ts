const THUMBNAIL_BASE = "https://www.thecocktaildb.com/images/media/drink";

const CATEGORY_PHOTO_FILES: Record<string, string> = {
	Cocktail: "metwgh1606770327.jpg", // Mojito
	"Ordinary Drink": "drtihp1606768397.jpg", // Gin Fizz
	Shot: "5a3vg61504372070.jpg", // B-52
	"Coffee / Tea": "sywsqw1439906999.jpg", // Irish Coffee
	Beer: "wwqrsw1441248662.jpg", // Limona Corona
	"Punch / Party Drink": "xrvxpp1441249280.jpg", // Sangria
	Shake: "uppqty1472720165.jpg", // Avalanche
	"Soft Drink": "uyrvut1479473214.jpg", // Citrus Coke
	Cocoa: "u6jrdf1487603173.jpg", // Drinking Chocolate
	"Homemade Liqueur": "uwtsst1441254025.jpg", // Homemade Kahlua
	"Other / Unknown": "1bw6sd1487603816.jpg", // Lassi - Mango
};

export function getCategoryPhoto(category: string): string | null {
	const file = CATEGORY_PHOTO_FILES[category];
	return file ? `${THUMBNAIL_BASE}/${file}/small` : null;
}
