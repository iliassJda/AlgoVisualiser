"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Shuffle } from "lucide-react";
import { generateBubbleSortSteps, generateRandomArray } from "@/utils/sorting/bubble-sort";
import { generateInsertionSortSteps } from "@/utils/sorting/insertion-sort";
import { generateSelectionSortSteps } from "@/utils/sorting/selection-sort";
import { generateQuickSortSteps } from "@/utils/sorting/quick-sort";
import { SortStep, SortType } from "@/types/algorithms";

interface SortingVisualizerProps {
	type: SortType;
}

export default function SortingVisualizer({ type }: SortingVisualizerProps) {
	const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
	const [numbers, setNumbers] = useState<string>("");
	const [steps, setSteps] = useState<SortStep[]>([]);
	const [currentStep, setCurrentStep] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [speed, setSpeed] = useState(500);
	const [arraySize, setArraySize] = useState(7);

	const generateSteps = useCallback(() => {
		if (array.length > 0) {
			let sortSteps: SortStep[];

			switch (type) {
				case "bubble-sort":
					sortSteps = generateBubbleSortSteps(array);
					break;
				case "insertion-sort":
					sortSteps = generateInsertionSortSteps(array);
					break;
				case "selection-sort":
					sortSteps = generateSelectionSortSteps(array);
					break;
				case "quick-sort":
					sortSteps = generateQuickSortSteps(array);
					break;
				// Add other sorting algorithms here as you implement them
				default:
					// console.log(`${type} not implemented yet, using bubble sort as fallback`);
					sortSteps = generateBubbleSortSteps(array);
			}

			setSteps(sortSteps);
			setCurrentStep(0);
		}
	}, [array, type]);

	useEffect(() => {
		const res = numbers.split(" ").map(Number);
		const reslen = res.length;
		if (reslen >= 2) {
			setArray(res);
			setArraySize(reslen);
		}
	}, [numbers]);

	useEffect(() => {
		generateSteps();
	}, [generateSteps]);

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (isRunning && !isPaused && currentStep < steps.length - 1) {
			interval = setInterval(() => {
				setCurrentStep((prev) => prev + 1);
			}, 1200 - speed);
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
		setCurrentStep(0);
		setIsRunning(false);
		setIsPaused(false);
	};

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
				}
			}
		};

		document.addEventListener("keydown", handleKeyPress);
		return () => document.removeEventListener("keydown", handleKeyPress);
	}, [isRunning, isPaused, steps.length]); // Include togglePlayPause

	const shuffleArray = () => {
		const newArray = generateRandomArray(arraySize);
		setArray(newArray);
		reset();
	};

	const updateArraySize = (newSize: number) => {
		setArraySize(newSize);
		const newArray = generateRandomArray(newSize);
		setArray(newArray);
		reset();
	};

	const currentStepData = steps[currentStep];

	// Calculate max value for scaling bars
	const maxValue = Math.max(...array);

	return (
		<div className="w-full max-w-6xl mx-auto p-6 bg-background border rounded-lg shadow-lg">
			{/* Array Size Control */}
			<div className="mb-6">
				<div className="mb-2">
					<label htmlFor="text" className="block text-sm font-medium mb-2 text-foreground">
						Numbers (space separated):
					</label>
					<input
						id="text"
						type="text"
						value={numbers}
						onChange={(e) => {
							// Only allow numbers and spaces
							const value = e.target.value.replace(/[^0-9 ]/g, "");
							setNumbers(value);
						}}
						onKeyDown={(e) => {
							// Only prevent letter keys, allow all other keys (Delete, Backspace, Arrow keys, etc.)
							if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
								e.preventDefault();
							}
						}}
						placeholder="Enter numbers separated by spaces (e.g. 64 34 25 12 22)"
						className="w-full px-3 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-primary"
						disabled={isRunning}
					/>
				</div>
				<label htmlFor="arraySize" className="block text-sm font-medium mb-2 text-foreground">
					Array Size: {arraySize}
				</label>
				<input
					id="arraySize"
					type="range"
					min="2"
					max="20"
					value={arraySize}
					onChange={(e) => updateArraySize(Number(e.target.value))}
					className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer 
						[&::-webkit-slider-track]:bg-muted [&::-webkit-slider-track]:rounded-lg 
						[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
						[&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
						[&::-moz-range-track]:bg-muted [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:border-0
						[&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
					disabled={isRunning}
				/>
			</div>

			{/* Controls */}
			<div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
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
				<button
					onClick={shuffleArray}
					className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/80 transition-colors"
					disabled={isRunning}
				>
					<Shuffle size={16} />
					Shuffle
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
					<h3 className="text-lg font-semibold mb-4 text-foreground">Array Visualization:</h3>
					<div className="flex items-end justify-center gap-2 mb-6" style={{ height: "300px" }}>
						{currentStepData.array.map((value, index) => {
							const height = (value / maxValue) * 250; // Scale to max 250px height
							let bgColor = "bg-muted-foreground";

							if (currentStepData.sorted.includes(index)) {
								bgColor = "bg-green-500";
							} else if (currentStepData.swapped.includes(index)) {
								bgColor = "bg-red-500";
							} else if (currentStepData.comparing.includes(index)) {
								bgColor = "bg-yellow-500";
							}

							return (
								<div key={index} className="flex flex-col items-center gap-1">
									<div
										className={`${bgColor} transition-all duration-300 rounded-t min-w-[20px] md:min-w-[30px] flex items-end justify-center text-white text-xs font-bold pb-1`}
										style={{
											height: `${height}px`,
											width: `${Math.max(20, 300 / arraySize)}px`,
										}}
									>
										{arraySize <= 15 ? value : ""}
									</div>
									<span className="text-xs text-muted-foreground font-mono">{index}</span>
								</div>
							);
						})}
					</div>

					{/* Step Info */}

					<div className="text-center mb-4">
						<div className="text-sm text-muted-foreground">
							Step: {currentStep + 1} / {steps.length}
						</div>
						{currentStep == steps.length - 1 ? (
							<div className="mt-2">
								<div className="text-sm font-semibold text-foreground mb-1">Sorting Complete!</div>
								<div className="text-sm text-muted-foreground">
									Result: [{currentStepData.array.join(", ")}]
								</div>
							</div>
						) : null}
					</div>
				</div>
			)}

			{/* Legend */}
			<div className="flex justify-center gap-4 text-sm flex-wrap text-foreground">
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-yellow-500 rounded"></div>
					<span>Comparing</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-red-500 rounded"></div>
					<span>Swapped</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-green-500 rounded"></div>
					<span>Sorted</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 bg-muted-foreground rounded"></div>
					<span>Unsorted</span>
				</div>
			</div>
		</div>
	);
}
