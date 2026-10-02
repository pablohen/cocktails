import type { Drink } from "@/types/Drink";

export interface Refinement {
	word: string;
	label: string;
	image: string;
	count: number;
}

const WORD_SEPARATOR = /[^\p{L}]+/u;
const STOP_WORDS = new Set(["the", "and", "with", "de", "of"]);
const MIN_WORD_LENGTH = 3;
const MAX_REFINEMENTS = 8;

export function splitWords(text: string): string[] {
	return text.toLowerCase().split(WORD_SEPARATOR).filter(Boolean);
}

export function getRefinements(
	drinks: Pick<Drink, "strDrink" | "strDrinkThumb">[],
	search: string,
): Refinement[] {
	const queryWords = new Set(splitWords(search));
	const byWord = new Map<string, Refinement>();

	for (const drink of drinks) {
		const seen = new Set<string>();
		for (const original of drink.strDrink.split(WORD_SEPARATOR)) {
			const word = original.toLowerCase();
			if (
				word.length < MIN_WORD_LENGTH ||
				queryWords.has(word) ||
				STOP_WORDS.has(word) ||
				seen.has(word)
			) {
				continue;
			}
			seen.add(word);

			const existing = byWord.get(word);
			if (existing) {
				existing.count += 1;
			} else {
				byWord.set(word, { word, label: original, image: drink.strDrinkThumb, count: 1 });
			}
		}
	}

	const refinements = [...byWord.values()]
		.sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
		.slice(0, MAX_REFINEMENTS);

	return refinements.length >= 2 ? refinements : [];
}
