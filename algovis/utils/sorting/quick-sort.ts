import { SortStep } from "@/types/algorithms";

export function generateQuickSortSteps(array: number[]): SortStep[] {
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

	// Quick sort helper function
	function quickSortHelper(low: number, high: number, sortedIndices: Set<number>) {
		if (low < high) {
			// Partition the array and get the pivot index
			const pivotIndex = partition(low, high, sortedIndices);
			console.log("new pivot index: " + pivotIndex);

			// Mark pivot as sorted
			sortedIndices.add(pivotIndex);

			// Show pivot is now in correct position
			steps.push({
				array: [...arr],
				comparing: [],
				swapped: [pivotIndex],
				sorted: Array.from(sortedIndices),
				step: stepCount++,
			});

			// Recursively sort elements before and after partition
			console.log("this is the new low part: " + low + " to " + (pivotIndex - 1));
			quickSortHelper(low, pivotIndex - 1, sortedIndices);
			quickSortHelper(pivotIndex + 1, high, sortedIndices);
		} else if (low === high) {
			// Single element is considered sorted
			sortedIndices.add(low);
		}
	}

	// Partition function - uses first element as pivot
	function partition(low: number, high: number, sortedIndices: Set<number>): number {
		const pivot = arr[low]; // Choose first element as pivot
		let i = low + 1; // Start from element after pivot

		// Show the pivot selection
		steps.push({
			array: [...arr],
			comparing: [low], // Highlight pivot
			swapped: [],
			sorted: Array.from(sortedIndices),
			step: stepCount++,
		});

		for (let j = low + 1; j <= high; j++) {
			// Show comparison with pivot
			steps.push({
				array: [...arr],
				comparing: [j, low], // Compare current element with pivot
				swapped: [],
				sorted: Array.from(sortedIndices),
				step: stepCount++,
			});

			// If current element is smaller than pivot
			if (arr[j] < pivot) {
				if (i !== j) {
					// Swap elements
					// console.log("swap " + i " and "+ )
					[arr[i], arr[j]] = [arr[j], arr[i]];

					// Show the swap
					steps.push({
						array: [...arr],
						comparing: [i, j, low],
						swapped: [i, j],
						sorted: Array.from(sortedIndices),
						step: stepCount++,
					});
				}
				i++; // Increment index for next smaller element
			}
		}

		// Place pivot in correct position (swap with element at i-1)
		if (i - 1 !== low) {
			[arr[low], arr[i - 1]] = [arr[i - 1], arr[low]];

			// Show pivot placement
			steps.push({
				array: [...arr],
				comparing: [low, i - 1],
				swapped: [low, i - 1],
				sorted: Array.from(sortedIndices),
				step: stepCount++,
			});
		}

		return i - 1; // Return position of pivot
	}

	// Start the quick sort process
	const sortedIndices = new Set<number>();
	quickSortHelper(0, n - 1, sortedIndices);

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
