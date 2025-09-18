import { SortStep } from "@/types/algorithms";

export default function generateBubbleSortSteps(array: number[]): SortStep[] {
	const steps: SortStep[] = [];

	function bubbleSwap(arr: number[], idx1: number, idx2: number): boolean {
		const keep = arr[idx1];
		arr[idx1] = arr[idx2];
		arr[idx2] = keep;
		return true;
	}
}
