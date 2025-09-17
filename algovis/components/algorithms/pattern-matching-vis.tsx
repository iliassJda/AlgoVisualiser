"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { generatePatternMatchingSteps } from "@/utils/pattern_matching/brute-force";
// Import other algorithms when they're created
import { generateQuickSearchSteps } from "@/utils/pattern_matching/quick-search";
import { generateKMPSteps } from "@/utils/pattern_matching/kmp";
import { PatternMatchStep, PatternType } from "@/types/algorithms";

// type PatternType = "brute-force" | "quick-search" | "kmp";
// type PatternType = "brute-force" | "quick-search" | "kmp";

interface PatternMatchingType {
	type?: PatternType; // Use the specific type instead of string
}

// const PatternMatchingVisualizer = () => {
function PatternMatchingVisualizer({ type }: PatternMatchingType) {
	const [text, setText] = useState("ABABDABACDABABCABCABCABCABC");
	const [pattern, setPattern] = useState("ABABCABCABC");
	const [steps, setSteps] = useState<PatternMatchStep[]>([]);
	const [currentStep, setCurrentStep] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [speed, setSpeed] = useState(500);

	const generateSteps = useCallback(() => {
		if (text && pattern) {
			let matchSteps: PatternMatchStep[];

			switch (type) {
				case "brute-force":
					matchSteps = generatePatternMatchingSteps(text, pattern);
					break;
				case "quick-search":
					matchSteps = generateQuickSearchSteps(text, pattern);
					// For now, fallback to brute-force until quick-search is implemented
					// console.log("Quick Search algorithm selected");
					// matchSteps = generatePatternMatchingSteps(text, pattern);
					break;
				case "kmp":
					matchSteps = generateKMPSteps(text, pattern);
					// For now, fallback to brute-force until KMP is implemented
					// console.log("KMP algorithm selected - using brute-force as fallback");
					// matchSteps = generatePatternMatchingSteps(text, pattern);
					break;
				default:
					// Default to brute-force if no type specified or unknown type
					// console.log("No algorithm type specified or unknown type - using brute-force");
					matchSteps = generatePatternMatchingSteps(text, pattern);
					break;
			}

			setSteps(matchSteps);
			setCurrentStep(0);
		}
	}, [text, pattern, type]); // Added 'type' to dependencies

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

	const togglePlayPause = useCallback(() => {
		if (isRunning) {
			setIsPaused(!isPaused);
		} else {
			setIsRunning(true);
			setIsPaused(false);
		}
	}, [isRunning, isPaused]);

	const reset = useCallback(() => {
		setIsRunning(false);
		setIsPaused(false);
		setCurrentStep(0);
	}, []);

	// Separate useEffect for keyboard navigation
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			// Only allow manual navigation when not auto-running
			if (!isRunning || isPaused) {
				switch (event.key) {
					case "ArrowLeft":
						event.preventDefault();
						setCurrentStep((prev) => Math.max(0, prev - 1));
						break;
					case "ArrowRight":
						event.preventDefault();
						setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
						break;
					// case " ": // Spacebar for play/pause
					// 	event.preventDefault();
					// 	togglePlayPause();
					// 	break;
				}
			}
		};

		document.addEventListener("keydown", handleKeyPress);
		return () => document.removeEventListener("keydown", handleKeyPress);
	}, [isRunning, isPaused, steps.length, togglePlayPause]); // Include togglePlayPause

	const currentStepData = steps[currentStep];

	return (
		<div className="w-full max-w-4xl mx-auto p-6 bg-background border rounded-lg shadow-lg">
			{/* Algorithm Type Indicator */}
			{/* {type && (
				<div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
					<h3 className="text-sm font-semibold text-primary">
						Algorithm:{" "}
						{type === "brute-force"
							? "Brute Force"
							: type === "quick-search"
							? "Quick Search"
							: type === "kmp"
							? "Knuth-Morris-Pratt"
							: type}
					</h3>
				</div>
			)} */}

			{/* Input Controls */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<div>
					<label htmlFor="text" className="block text-sm font-medium mb-2 text-foreground">
						Text:
					</label>
					<input
						id="text"
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value.toUpperCase())}
						className="w-full px-3 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-primary"
						disabled={isRunning}
					/>
				</div>
				<div>
					<label htmlFor="pattern" className="block text-sm font-medium mb-2 text-foreground">
						Pattern:
					</label>
					<input
						id="pattern"
						type="text"
						value={pattern}
						onChange={(e) => setPattern(e.target.value.toUpperCase())}
						className="w-full px-3 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-primary"
						disabled={isRunning}
					/>
				</div>
			</div>

			{/* Controls */}
			<div className="flex items-center justify-center gap-4 mb-6">
				<button
					onClick={togglePlayPause}
					className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
				>
					{isRunning && !isPaused ? <Pause size={16} /> : <Play size={16} />}
					{isRunning && !isPaused ? "Pause" : "Play"}
				</button>
				<button
					onClick={reset}
					className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
				>
					<RotateCcw size={16} />
					Reset
				</button>
				<div className="flex items-center gap-2">
					<label htmlFor="speed" className="text-sm font-medium text-foreground">
						Speed:
					</label>
					<div className="flex items-center gap-2">
						<span className="text-xs text-muted-foreground">Slow</span>
						<input
							id="speed"
							type="range"
							min="200"
							max="1000"
							step="100"
							value={speed}
							onChange={(e) => setSpeed(Number(e.target.value))}
							className="w-20 h-2 bg-muted rounded-lg appearance-none cursor-pointer 
								[&::-webkit-slider-track]:bg-muted [&::-webkit-slider-track]:rounded-lg 
								[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
								[&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
								[&::-moz-range-track]:bg-muted [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:border-0
								[&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
						/>
						<span className="text-xs text-muted-foreground">Fast</span>
					</div>
				</div>
			</div>

			{/* Visualization */}
			{currentStepData && (
				<div className="bg-muted/50 p-6 rounded-lg mb-4">
					{/* Text */}
					<div className="mb-6">
						<h3 className="text-lg font-semibold mb-2 text-foreground">Text:</h3>
						<div className="font-mono text-lg flex flex-wrap gap-1">
							{currentStepData.text.split("").map((char, index) => {
								const isCurrentPosition = index === currentStepData.textIndex;
								const isMatched = currentStepData.matches.some(
									(matchIndex) => index >= matchIndex && index < matchIndex + pattern.length
								);

								let bgColor = "";
								if (isMatched) bgColor = "bg-green-200 dark:bg-green-800";
								else if (isCurrentPosition) {
									bgColor = currentStepData.currentMatch
										? "bg-yellow-300 dark:bg-yellow-700"
										: "bg-red-300 dark:bg-red-800";
								}

								return (
									<span
										key={index}
										className={`px-1 py-1 rounded ${bgColor} transition-colors text-center duration-300 w-[2rem] inline-block text-foreground`}
									>
										{char}
									</span>
								);
							})}
						</div>
					</div>
					{/* Pattern aligned with text */}
					<div className="mb-6">
						<h3 className="text-lg font-semibold mb-2 text-foreground">Pattern:</h3>
						<div className="font-mono text-lg flex flex-wrap gap-1">
							{/* Create spaces to align pattern with current position */}
							{Array.from({ length: currentStepData.patternPosition }).map((_, index) => (
								<span
									key={`space-${index}`}
									className="px-1 py-1 w-[2rem] text-center inline-block"
								>
									{/* Empty space to align with text characters */}
								</span>
							))}
							{/* Render the pattern */}
							{currentStepData.pattern.split("").map((char, index) => {
								const isCurrentPosition = index === currentStepData.patternIndex;
								const textIndex = currentStepData.patternPosition + index;
								const isMatching =
									textIndex < currentStepData.text.length &&
									currentStepData.text[textIndex] === char;

								let bgColor = "bg-muted dark:bg-muted";
								if (isCurrentPosition) {
									bgColor = isMatching
										? "bg-yellow-300 dark:bg-yellow-700"
										: "bg-red-300 dark:bg-red-800";
								} else if (index < currentStepData.patternIndex) {
									// Characters already compared
									bgColor =
										currentStepData.text[currentStepData.patternPosition + index] === char
											? "bg-green-300 dark:bg-green-700"
											: "bg-red-200 dark:bg-red-900";
								}

								return (
									<span
										key={index}
										className={`px-1 py-1 rounded ${bgColor} transition-colors duration-300 text-center w-[2rem] inline-block text-foreground`}
									>
										{char}
									</span>
								);
							})}
						</div>
					</div>
					{/* Matches Found */}
					<div>
						<h3 className="text-lg font-semibold mb-2 text-foreground">
							Matches Found: {currentStepData.matches.length}
						</h3>
						<div className="text-sm text-muted-foreground">
							Positions:{" "}
							{currentStepData.matches.length > 0 ? currentStepData.matches.join(", ") : "None"}
						</div>
					</div>
				</div>
			)}

			{/* Step Info */}
			<div className="text-center text-sm text-muted-foreground mb-4">
				Step: {currentStep} / {steps.length - 1}
			</div>

			{/* Legend */}
			<div className="flex justify-center gap-4 text-sm flex-wrap text-foreground">
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-yellow-300 dark:bg-yellow-700 rounded"></div>
					<span>Current Comparison</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-green-300 dark:bg-green-700 rounded"></div>
					<span>Match</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-red-300 dark:bg-red-800 rounded"></div>
					<span>Mismatch</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-green-200 dark:bg-green-800 rounded"></div>
					<span>Found Match</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-muted dark:bg-muted rounded"></div>
					<span>Not Yet Compared</span>
				</div>
			</div>
		</div>
	);
}

export default PatternMatchingVisualizer;
