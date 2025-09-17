// import { url } from "inspector";
// import { title } from "process";

const data = {
	navMain: [
		{
			title: "Pattern Matching",
			items: [
				{
					title: "Brute Force",
					key: "brute-force",
					url: "/brute-force",
					// script: "@/utils/pattern_matching/brute-force.tsx",
				},
				{
					title: "Quick Search",
					key: "quick-search",
					url: "/quick-search",
				},
				{
					title: "Knuth-Morris-Pratt",
					key: "kmp",
					url: "/kmp",
				},
			],
		},
		{
			title: "Linear ADTs",
			items: [
				{
					title: "Vectorial",
					key: "vectorial",
					url: "#",
				},
				{
					title: "Single Linked",
					key: "single-linked",
					url: "#",
				},
				{
					title: "Double Linked",
					key: "double-linked",
					url: "#",
				},
				{
					title: "Improved Double Linked",
					key: "improved-double-linked",
					url: "#",
				},
			],
		},
		{
			title: "Linear Data Structures",

			items: [
				{
					title: "Stack",
					key: "stack",
					url: "#",
				},
				{
					title: "Queue",
					key: "queue",
					url: "#",
				},
				{
					title: "Priority Queue",
					key: "priority-queue",
					url: "#",
				},
				{
					title: "Heap",
					key: "heap",
					url: "#",
				},
			],
		},
		{
			title: "Sorting Algorithms",

			items: [
				{
					title: "Bubble Sort",
					key: "bubble-sort",
					url: "#",
				},
				{
					title: "Insertion Sort",
					key: "insertion-sort",
					url: "#",
				},
				{
					title: "Selection Sort",
					key: "selection-sort",
					url: "#",
				},
				{
					title: "Quick Sort",
					key: "quick-sort",
					url: "#",
				},
				{
					title: "Merge Sort",
					key: "merge-sort",
					url: "#",
				},
				{
					title: "Heap Sort",
					key: "heap-sort",
					url: "#",
				},
				{
					title: "Radix Sort",
					key: "radix-sort",
					url: "#",
				},
				{
					title: "Counting Sort",
					key: "counting-sort",
					url: "#",
				},
				{
					title: "Bucket Sort",
					key: "bucket-sort",
					url: "#",
				},
			],
		},
		{
			title: "Trees",
			url: "#",
			items: [
				{
					title: "Binary trees",
					url: "#",
					items: [
						{
							title: "Linked",
							key: "linked",
							url: "#",
						},
						{
							title: "Vectorial",
							key: "vectorial",
							url: "#",
						},
						{
							title: "Double Linked",
							key: "double-linked",
							url: "#",
						},
					],
				},
				{
					title: "Traversals",
					url: "#",
					items: [
						{
							title: "Pre Order",
							key: "pre-order",
							url: "#",
						},
						{
							title: "In Order",
							key: "in-order",
							url: "#",
						},
						{
							title: "Post Order",
							key: "post-order",
							url: "#",
						},
					],
				},
				{
					title: "AVL trees",
					items: [
						{
							title: "Insert",
							key: "insert",
							url: "#",
						},
						{
							title: "Delete",
							key: "delete",
							url: "#",
						},
					],
				},
			],
		},
		{
			title: "Hashing",
			url: "#",
			items: [
				{
					title: "External Chaining",
					items: [
						{
							title: "Insert",
							key: "insert",
							url: "#",
						},
						{
							title: "Delete",
							key: "delete",
							url: "#",
						},
					],
					url: "#",
				},
				{
					title: "Open addressing",
					items: [
						{
							title: "Linear Probing",
							key: "linear-probing",
							url: "#",
						},
						{
							title: "Quadratic Probing",
							key: "quadratic probing",
							url: "#",
						},
						{
							title: "Double Rehashing",
							key: "double-rehashing",
							url: "#",
						},
					],
					url: "#",
				},
			],
		},
	],
};

// Create a dictionary mapping keys to titles
const keyToTitle: Record<string, string> = {};

data.navMain.forEach((section) => {
	section.items?.forEach((item) => {
		if ("key" in item && item.key) {
			keyToTitle[item.key] = item.title;
		}
		// Handle nested items if they exist
		if ("items" in item && item.items) {
			item.items.forEach((subitem) => {
				if ("key" in subitem && subitem.key) {
					keyToTitle[subitem.key] = subitem.title;
				}
			});
		}
	});
});

export { keyToTitle, data };
