import { SortStep } from "@/types/algorithms";

export function generateBubbleSortSteps(array: number[]): SortStep[] {
	const steps: SortStep[] = [];
	const arr = [...array]; // Create a copy to avoid mutating the original
	const n = arr.length;
	let stepCount = 0;

	// Initial state
	steps.push({
		array: [...arr],
		comparing: [],
		swapped: [],
		sorted: [],
		step: stepCount++,
	});

	for (let i = 0; i < n - 1; i++) {
		// unsorted idx
		let wasSwapped = false;

		for (let j = 0; j < n - i - 1; j++) {
			// Inner idx
			// Show comparison
			steps.push({
				array: [...arr],
				comparing: [j, j + 1],
				swapped: [],
				sorted: Array.from({ length: i }, (_, k) => n - 1 - k), // Elements already sorted
				step: stepCount++,
			});

			// Check if we need to swap
			if (arr[j] > arr[j + 1]) {
				// Perform swap
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				wasSwapped = true;

				// Show swap
				steps.push({
					array: [...arr],
					comparing: [j, j + 1],
					swapped: [j, j + 1],
					sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
					step: stepCount++,
				});
			}
		}

		// Mark the last element as sorted
		steps.push({
			array: [...arr],
			comparing: [],
			swapped: [],
			sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
			step: stepCount++,
		});

		// If no swapping occurred, the array is sorted
		if (!wasSwapped) {
			break;
		}
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
