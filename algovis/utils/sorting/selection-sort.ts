import { SortStep } from "@/types/algorithms";

export function generateSelectionSortSteps(array: number[]): SortStep[] {
	const steps: SortStep[] = [];
	const arr = [...array]; // Create a copy to avoid mutating the original
	const n = arr.length;
	let stepCount = 0;

	// Initial state
	steps.push({
		array: [...arr],
		comparing: [],
		swapped: [],
		sorted: [], // No elements sorted initially
		step: stepCount++,
	});

	for (let i = 0; i < n - 1; i++) {
		let smallestIdx = i;

		// Show the current position we're trying to fill
		steps.push({
			array: [...arr],
			comparing: [i],
			swapped: [],
			sorted: Array.from({ length: i }, (_, k) => k), // Elements 0 to i-1 are sorted
			step: stepCount++,
		});

		// Find the smallest element in the remaining unsorted portion
		for (let j = i + 1; j < n; j++) {
			// Show comparison between current smallest and current element
			steps.push({
				array: [...arr],
				comparing: [smallestIdx, j],
				swapped: [],
				sorted: Array.from({ length: i }, (_, k) => k),
				step: stepCount++,
			});

			if (arr[j] < arr[smallestIdx]) {
				smallestIdx = j;

				// Show that we found a new smallest element
				steps.push({
					array: [...arr],
					comparing: [smallestIdx, j],
					swapped: [j], // Highlight the new smallest element
					sorted: Array.from({ length: i }, (_, k) => k),
					step: stepCount++,
				});
			}
		}

		// Swap if we found a smaller element
		if (smallestIdx !== i) {
			// Show the swap
			[arr[i], arr[smallestIdx]] = [arr[smallestIdx], arr[i]];
			// swap(array, i, smallestIdx);

			steps.push({
				array: [...arr],
				comparing: [i, smallestIdx],
				swapped: [i, smallestIdx],
				sorted: Array.from({ length: i }, (_, k) => k),
				step: stepCount++,
			});
		}

		// Show the final placement - element at position i is now sorted
		steps.push({
			array: [...arr],
			comparing: [],
			swapped: [],
			sorted: Array.from({ length: i + 1 }, (_, k) => k), // Now elements 0 to i are sorted
			step: stepCount++,
		});
	}

	// Final state - all elements sorted
	steps.push({
		array: [...arr],
		comparing: [],
		swapped: [],
		sorted: Array.from({ length: n }, (_, k) => k),
		step: stepCount++,
	});

	return steps;
}

function swap(array: number[], i: number, j: number) {
	const keep = array[i];
	array[i] = array[j];
	array[j] = keep;
}

// Helper function to generate a random array for testing
export function generateRandomArray(size: number, max: number = 100): number[] {
	return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}

// // Helper function to check if array is sorted
// export function isSorted(array: number[]): boolean {
// 	for (let i = 1; i < array.length; i++) {
// 		if (array[i] < array[i - 1]) {
// 			return false;
// 		}
// 	}
// 	return true;
// }
