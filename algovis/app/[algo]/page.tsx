// "use client";
// import { keyToTitle } from "@/data";
import ScriptBlock from "@/components/script-block";
import PatternMatchingVisualizer from "@/components/algorithms/pattern-matching-vis";
import { PatternType, SortType } from "@/types/algorithms";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Unknown from "@/components/unkown";

// Type guard functions using objects as lookup
const PATTERN_ALGORITHMS = {
	"brute-force": true,
	"quick-search": true,
	kmp: true,
} as const;

const SORT_ALGORITHMS = {
	"bubble-sort": true,
	"insertion-sort": true,
	"selection-sort": true,
	"merge-sort": true,
	"quick-sort": true,
	"heap-sort": true,
	"radix-sort": true,
	"counting-sort": true,
	"bucket-sort": true,
} as const;

const isPatternType = (algo: string): algo is PatternType => {
	return algo in PATTERN_ALGORITHMS;
};

const isSortType = (algo: string): algo is SortType => {
	return algo in SORT_ALGORITHMS;
};

export default async function AlgoPage({ params }: { params: { algo: string } }) {
	const { algo } = await params;

	// Check algorithm type and render appropriate component
	if (isPatternType(algo)) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8 mx-auto max-w-6xl">
				<ScriptBlock title={algo} />
				<PatternMatchingVisualizer type={algo} />
			</div>
		);
	} else if (isSortType(algo)) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8 mx-auto max-w-6xl">
				<ScriptBlock title={algo} />
				{/* <SortingVisualizer type={algo} /> */}
				<div>Sorting visualizer for {algo} (not implemented yet)</div>
			</div>
		);
	} else {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8 mx-auto max-w-6xl">
				<ScriptBlock title={algo} />
				{/* <DotLottieReact src="/BookLoader.lottie" autoplay loop className="w-full max-w-2xl" /> */}
				{/* <Unknown algo={algo} /> */}
				<div>Unknown algorithm: {algo}</div>
			</div>
		);
	}
}
