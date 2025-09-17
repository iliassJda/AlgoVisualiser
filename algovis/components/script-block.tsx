import { keyToTitle } from "@/data";
import React from "react";

// type Algorithm = 'bubble-sort' | 'pattern-matching';

interface ScriptBlockProps {
	// children: React.ReactNode;
	className?: string;
	title: string;
}

export default function ScriptBlock({ className = "", title }: ScriptBlockProps) {
	const algo = keyToTitle[title];
	return (
		<div className={` ${className}`}>
			{title && <h3 className="text-3xl font-bold  mb-4 border-b border-gray-100 pb-2">{algo}</h3>}
			{/* <div className="space-y-4">{children}</div> */}
		</div>
	);
}
