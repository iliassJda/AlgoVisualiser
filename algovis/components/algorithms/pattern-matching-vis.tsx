"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { generatePatternMatchingSteps } from "@/utils/pattern_matching/brute-force";
import { PatternMatchStep } from "@/types/algorithms";

const PatternMatchingVisualizer = () => {
	const [text, setText] = useState("ABABDABACDABABCABCABCABCABC");
	const [pattern, setPattern] = useState("ABABCABCABC");
	const [steps, setSteps] = useState<PatternMatchStep[]>([]);
	const [currentStep, setCurrentStep] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [speed, setSpeed] = useState(500);

	const generateSteps = useCallback(() => {
		if (text && pattern) {
			const matchSteps = generatePatternMatchingSteps(text, pattern);
			setSteps(matchSteps);
			setCurrentStep(0);
		}
	}, [text, pattern]);

	useEffect(() => {
		generateSteps();
	}, [generateSteps]);

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (isRunning && !isPaused && currentStep < steps.length - 1) {
			interval = setInterval(() => {
				setCurrentStep((prev) => prev + 1);
			}, 1200 - speed); // Invert speed: lower slider value = faster animation
		} else if (currentStep >= steps.length - 1) {
			setIsRunning(false);
		}

		return () => clearInterval(interval);
	}, [isRunning, isPaused, currentStep, steps.length, speed]);

	const togglePlayPause = () => {
		if (isRunning) {
			setIsPaused(!isPaused);
		} else {
			setIsRunning(true);
			setIsPaused(false);
		}
	};

	const reset = () => {
		setIsRunning(false);
		setIsPaused(false);
		setCurrentStep(0);
	};

	const currentStepData = steps[currentStep];

	return (
		<div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
			{/* <h2 className="text-2xl font-bold mb-6 text-center">
				Pattern Matching (Brute Force) Visualizer
			</h2> */}

			{/* Input Controls */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<div>
					<label htmlFor="text" className="block text-sm font-medium mb-2">
						Text:
					</label>
					<input
						id="text"
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value.toUpperCase())}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={isRunning}
					/>
				</div>
				<div>
					<label htmlFor="pattern" className="block text-sm font-medium mb-2">
						Pattern:
					</label>
					<input
						id="pattern"
						type="text"
						value={pattern}
						onChange={(e) => setPattern(e.target.value.toUpperCase())}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={isRunning}
					/>
				</div>
			</div>

			{/* Controls */}
			<div className="flex items-center justify-center gap-4 mb-6">
				<button
					onClick={togglePlayPause}
					className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
				>
					{isRunning && !isPaused ? <Pause size={16} /> : <Play size={16} />}
					{isRunning && !isPaused ? "Pause" : "Play"}
				</button>
				<button
					onClick={reset}
					className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
				>
					<RotateCcw size={16} />
					Reset
				</button>
				<div className="flex items-center gap-2">
					<label htmlFor="speed" className="text-sm font-medium">
						Speed:
					</label>
					<div className="flex items-center gap-2">
						<span className="text-xs text-gray-500">Slow</span>
						<input
							id="speed"
							type="range"
							min="200"
							max="1000"
							step="100"
							value={speed}
							onChange={(e) => setSpeed(Number(e.target.value))}
							className="w-20"
						/>
						<span className="text-xs text-gray-500">Fast</span>
					</div>
				</div>
			</div>

			{/* Visualization */}
			{currentStepData && (
				<div className="bg-gray-100 p-6 rounded-lg mb-4">
					{/* Text */}
					<div className="mb-6">
						<h3 className="text-lg font-semibold mb-2">Text:</h3>
						<div className="font-mono text-lg flex flex-wrap gap-1">
							{currentStepData.text.split("").map((char, index) => {
								const isCurrentPosition = index === currentStepData.textIndex;
								const isMatched = currentStepData.matches.some(
									(matchIndex) => index >= matchIndex && index < matchIndex + pattern.length
								);

								let bgColor = "";
								if (isMatched) bgColor = "bg-green-200";
								else if (isCurrentPosition) {
									bgColor = currentStepData.currentMatch ? "bg-yellow-300" : "bg-red-300";
								}

								return (
									<span
										key={index}
										className={`px-1 py-1 rounded ${bgColor} transition-colors duration-300`}
									>
										{char}
									</span>
								);
							})}
						</div>
					</div>

					{/* Pattern aligned with text */}
					<div className="mb-6">
						<h3 className="text-lg font-semibold mb-2">Pattern:</h3>
						<div className="font-mono text-lg flex gap-1">
							{/* Create spaces to align pattern with current position */}
							{Array.from({ length: currentStepData.patternPosition }).map((_, index) => (
								<span key={`space-${index}`} className="px-1 py-1 w-[2.25rem] text-center">
									{/* Empty space */}
								</span>
							))}
							{/* Render the pattern */}
							{currentStepData.pattern.split("").map((char, index) => {
								const isCurrentPosition = index === currentStepData.patternIndex;
								const textIndex = currentStepData.patternPosition + index;
								const isMatching =
									textIndex < currentStepData.text.length &&
									currentStepData.text[textIndex] === char;

								let bgColor = "bg-gray-200";
								if (isCurrentPosition) {
									bgColor = isMatching ? "bg-yellow-300" : "bg-red-300";
								} else if (index < currentStepData.patternIndex) {
									// Characters already compared
									bgColor =
										currentStepData.text[currentStepData.patternPosition + index] === char
											? "bg-green-300"
											: "bg-red-200";
								}

								return (
									<span
										key={index}
										className={`px-1 py-1 rounded ${bgColor} transition-colors duration-300 w-[2.25rem] text-center`}
									>
										{char}
									</span>
								);
							})}
						</div>
					</div>

					{/* Matches Found */}
					<div>
						<h3 className="text-lg font-semibold mb-2">
							Matches Found: {currentStepData.matches.length}
						</h3>
						<div className="text-sm text-gray-600">
							Positions:{" "}
							{currentStepData.matches.length > 0 ? currentStepData.matches.join(", ") : "None"}
						</div>
					</div>
				</div>
			)}

			{/* Step Info */}
			<div className="text-center text-sm text-gray-600 mb-4">
				Step: {currentStep} / {steps.length - 1}
			</div>

			{/* Legend */}
			<div className="flex justify-center gap-4 text-sm flex-wrap">
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-yellow-300 rounded"></div>
					<span>Current Comparison</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-green-300 rounded"></div>
					<span>Match</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-red-300 rounded"></div>
					<span>Mismatch</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-green-200 rounded"></div>
					<span>Found Match</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-gray-200 rounded"></div>
					<span>Not Yet Compared</span>
				</div>
			</div>
		</div>
	);
};

export default PatternMatchingVisualizer;
