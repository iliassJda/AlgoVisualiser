import { PatternMatchStep } from "@/types/algorithms";

export function generateKMPSteps(text: string, pattern: string): PatternMatchStep[] {
	const steps: PatternMatchStep[] = [];
	const matches: number[] = [];

	const nt = text.length;
	const np = pattern.length;
	const sigma = computeFailureFunction(pattern);

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

	let i = 0; // text index
	let j = 0; // pattern index

	while (i < nt) {
		// Show current comparison
		steps.push({
			text,
			pattern,
			textIndex: i,
			patternIndex: j,
			patternPosition: i - j,
			matches: [...matches],
			currentMatch: text[i] === pattern[j],
			step: steps.length,
		});

		if (text[i] === pattern[j]) {
			// Characters match
			i++;
			j++;

			// Check if we found a complete match
			if (j === np) {
				matches.push(i - j);
				steps.push({
					text,
					pattern,
					textIndex: i - j,
					patternIndex: 0,
					patternPosition: i - j,
					matches: [...matches],
					currentMatch: true,
					step: steps.length,
				});

				// Stop after finding the first match (like brute-force)
				break;
			}
		} else {
			// Characters don't match
			if (j > 0) {
				// Use failure function to skip characters
				j = sigma(j);
			} else {
				// No partial match, move to next character in text
				i++;
			}
		}
	}

	return steps;
}

function computeFailureFunction(pattern: string) {
	const np = pattern.length;
	const sigmaTable: number[] = new Array(np).fill(0);

	// First position is always 0
	sigmaTable[0] = 0;

	let k = 0; // length of previous longest prefix suffix
	let i = 1; // position in pattern

	while (i < np) {
		if (pattern[i] === pattern[k]) {
			k++;
			sigmaTable[i] = k;
			i++;
		} else {
			if (k !== 0) {
				// Use previously computed value
				k = sigmaTable[k - 1];
			} else {
				sigmaTable[i] = 0;
				i++;
			}
		}
	}

	return (q: number) => {
		return q > 0 ? sigmaTable[q - 1] : 0;
	};
}
