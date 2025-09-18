import { SortStep } from "@/types/algorithms";

export function generateInsertionSortSteps(array: number[]): SortStep[] {
	const steps: SortStep[] = [];
	const arr = [...array]; // Create a copy to avoid mutating the original
	const n = arr.length;
	let stepCount = 0;

	// Initial state - last element is considered sorted
	steps.push({
		array: [...arr],
		comparing: [],
		swapped: [],
		sorted: [n - 1], // Last element is already "sorted"
		step: stepCount++,
	});

	for (let i = n - 2; i >= 0; i--) {
		const key = arr[i];
		let insertPos = i;

		// Show the element we're trying to insert
		steps.push({
			array: [...arr],
			comparing: [i],
			swapped: [],
			sorted: Array.from({ length: n - i - 1 }, (_, k) => i + 1 + k), // Elements i+1 to n-1 are sorted
			step: stepCount++,
		});

		// Find the correct position for key by comparing with elements from i to end
		for (let j = i + 1; j < n; j++) {
			// Show comparison
			// steps.push({
			// 	array: [...arr],
			// 	comparing: [i, j],
			// 	swapped: [],
			// 	sorted: Array.from({ length: n - i - 1 }, (_, k) => i + 1 + k),
			// 	step: stepCount++,
			// });

			if (arr[j] < key) {
				insertPos = j;
			} else {
				break; // Found the correct position
			}
		}

		// If we need to move the key
		if (insertPos !== i) {
			// Shift elements to make room
			for (let k = i; k < insertPos; k++) {
				arr[k] = arr[k + 1];

				// Show the shifting
				steps.push({
					array: [...arr],
					comparing: [k, k + 1],
					swapped: [k],
					sorted: Array.from({ length: n - i - 1 }, (_, k) => i + 1 + k),
					step: stepCount++,
				});
			}

			// Place key at its correct position
			arr[insertPos] = key;

			// Show the final placement
			steps.push({
				array: [...arr],
				comparing: [],
				swapped: [insertPos],
				sorted: Array.from({ length: n - i }, (_, k) => i + k), // Now elements i to n-1 are sorted
				step: stepCount++,
			});
		} else {
			// Key is already in correct position
			steps.push({
				array: [...arr],
				comparing: [],
				swapped: [],
				sorted: Array.from({ length: n - i }, (_, k) => i + k), // Now elements i to n-1 are sorted
				step: stepCount++,
			});
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
