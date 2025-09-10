"use client";

import { usePathname } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define route mappings for better display names
const routeMap: Record<string, string> = {
	"": "Home",
	dashboard: "Dashboard",
	"brute-force": "Brute Force",
	"quick-search": "Quick Search",
	kmp: "Knuth-Morris-Pratt",
	vectorial: "Vectorial",
	"single-linked": "Single Linked",
	"double-linked": "Double Linked",
	"improved-double-linked": "Improved Double Linked",
	stack: "Stack",
	queue: "Queue",
	"priority-queue": "Priority Queue",
	heap: "Heap",
	"bubble-sort": "Bubble Sort",
	"insertion-sort": "Insertion Sort",
	"selection-sort": "Selection Sort",
	"quick-sort": "Quick Sort",
	"merge-sort": "Merge Sort",
	"heap-sort": "Heap Sort",
	"radix-sort": "Radix Sort",
	"counting-sort": "Counting Sort",
	"bucket-sort": "Bucket Sort",
};

export function DynamicBreadcrumb() {
	const pathname = usePathname();

	// Split the pathname and filter out empty strings
	const pathSegments = pathname.split("/").filter(Boolean);

	// If we're on the home page, don't show breadcrumbs
	if (pathSegments.length === 0) {
		return null;
	}

	// Generate breadcrumb items
	const breadcrumbItems = pathSegments.map((segment, index) => {
		const href = "/" + pathSegments.slice(0, index + 1).join("/");
		const isLast = index === pathSegments.length - 1;
		const displayName = routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

		return {
			href,
			label: displayName,
			isLast,
		};
	});

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{/* Always show Home as the first item */}
				<BreadcrumbItem className="hidden md:block">
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>

				{breadcrumbItems.map((item) => (
					<div key={item.href} className="flex items-center">
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem>
							{item.isLast ? (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					</div>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
