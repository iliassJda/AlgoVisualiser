export interface SortStep {
	array: number[];
	comparing: number[];
	swapped: number[];
	sorted: number[];
	step: number;
}

export interface PatternMatchStep {
	text: string;
	pattern: string;
	textIndex: number;
	patternIndex: number;
	patternPosition: number; // Position where pattern starts comparison
	matches: number[];
	currentMatch: boolean;
	step: number;
}

export interface AlgorithmState {
	isRunning: boolean;
	isPaused: boolean;
	currentStep: number;
	steps: (SortStep | PatternMatchStep)[];
	speed: number;
}

export type PatternType = "brute-force" | "quick-search" | "kmp";
export type SortType =
	| "bubble-sort"
	| "insertion-sort"
	| "selection-sort"
	| "merge-sort"
	| "quick-sort"
	| "heap-sort"
	| "radix-sort"
	| "counting-sort"
	| "bucket-sort";
