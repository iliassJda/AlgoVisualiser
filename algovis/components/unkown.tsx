import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Unknown({ algo }: { algo: string }) {
	return (
		<>
			<DotLottieReact src="/notFound.lottie" autoplay loop className="w-full max-w-3xl" />
			<div>Unknown algorithm: {algo}</div>
		</>
	);
}
