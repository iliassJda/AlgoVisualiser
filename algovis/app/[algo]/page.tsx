// import { keyToTitle } from "@/data";
import ScriptBlock from "@/components/script-block";
import PatternMatchingVisualizer from "@/components/algorithms/pattern-matching-vis";
import { PatternType } from "@/types/algorithms";

export default async function AlgoPage({ params }: { params: { algo: string } }) {
	const { algo } = await params;
	// const algoName = keyToTitle[algo];
	// type PatternType = "brute-force" | "quick-search" | "kmp";
	// Convert algo string to PatternType
	const patternType = algo as PatternType;

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8 mx-auto max-w-6xl">
			<ScriptBlock title={algo} />
			<PatternMatchingVisualizer type={patternType} />
		</div>
	);
}
