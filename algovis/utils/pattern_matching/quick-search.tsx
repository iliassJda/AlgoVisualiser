import { PatternMatchStep } from "@/types/algorithms";

export function generateQuickSearchSteps(text: string, pattern: string): PatternMatchStep[] {
	const steps: PatternMatchStep[] = [];
	const matches: number[] = [];

	const nt = text.length;
	const np = pattern.length;
	const shift = computeShiftTable(pattern);

	// Initial state
	steps.push({
		text,
		pattern,
		textIndex: 0,
		patternIndex: 0,
		patternPosition: 0,
		matches: [],
		currentMatch: false,
		step: 0,
	});

	let i = 0;
	while (i <= nt - np) {
		let j = 0;
		// Show pattern moving to position i
		steps.push({
			text,
			pattern,
			textIndex: i,
			patternIndex: 0,
			patternPosition: i,
			matches: [...matches],
			currentMatch: false,
			step: steps.length,
		});

		// Try to match pattern at position i
		while (j < pattern.length) {
			if (text[i + j] !== pattern[j]) {
				const c = (i + np) % nt;
				const ct = text[c];
				const newPos = i + shift(ct);

				steps.push({
					text,
					pattern,
					textIndex: newPos,
					patternIndex: 0,
					patternPosition: newPos,
					matches: [...matches],
					currentMatch: false,
					step: steps.length,
				});
				i = newPos;
				// j = 0;
				break;
			} else {
				steps.push({
					text,
					pattern,
					textIndex: i + j,
					patternIndex: j,
					patternPosition: i,
					matches: [...matches],
					currentMatch: text[i + j] === pattern[j],
					step: steps.length,
				});
			}
			j++;
		}

		// If we matched the entire pattern
		if (j === pattern.length) {
			matches.push(i);
			steps.push({
				text,
				pattern,
				textIndex: i,
				patternIndex: 0,
				patternPosition: i,
				matches: [...matches],
				currentMatch: true,
				step: steps.length,
			});
			// Stop after finding the first match
			break;
		}
	}

	return steps;
}

// From Mathias Github AlgoVisualiser
function computeShiftTable(pattern: string) {
	const n_p = pattern.length;
	let min_ascii = pattern.charCodeAt(0);
	let max_ascii = min_ascii;

	function createTable(index: number) {
		if (index < n_p) {
			min_ascii = Math.min(min_ascii, pattern.charCodeAt(index));
			max_ascii = Math.max(max_ascii, pattern.charCodeAt(index));
			return createTable(index + 1);
		} else {
			const table = [];
			for (let i = 0; i < max_ascii - min_ascii + 1; i++) {
				table[i] = n_p + 1;
			}
			return table;
		}
	}

	const shiftTable = createTable(0);

	function fillTable(index: number) {
		if (index < n_p) {
			const ascii = pattern.charCodeAt(index);
			shiftTable[ascii - min_ascii] = n_p - index;
			return fillTable(index + 1);
		}
	}

	fillTable(0);

	return (char: string) => {
		const ascii = char.charCodeAt(0);
		if (max_ascii >= ascii && ascii >= min_ascii) {
			return shiftTable[ascii - min_ascii];
		} else {
			return n_p + 1;
		}
	};
}
