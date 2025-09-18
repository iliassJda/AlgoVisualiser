import { PatternMatchStep } from "@/types/algorithms";

export function generatePatternMatchingSteps(text: string, pattern: string): PatternMatchStep[] {
	const steps: PatternMatchStep[] = [];
	const matches: number[] = [];

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

	for (let i = 0; i <= text.length - pattern.length; i++) {
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

			if (text[i + j] !== pattern[j]) {
				break;
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
