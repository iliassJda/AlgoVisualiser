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
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<ScriptBlock title={algo} />
			<PatternMatchingVisualizer type={patternType} />
		</div>
	);
}
