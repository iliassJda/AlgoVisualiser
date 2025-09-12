import { keyToTitle } from "@/data";
import ScriptBlock from "@/components/script-block";
import PatternMatchingVisualizer from "@/components/algorithms/pattern-matching-vis";
export default async function AlgoPage({ params }: { params: { algo: string } }) {
	const { algo } = await params;
	// const algoName = keyToTitle[algo];

	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<ScriptBlock title={algo} />
			<PatternMatchingVisualizer />
		</div>
	);
}
