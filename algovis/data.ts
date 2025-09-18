const data = {
	navMain: [
		{
			title: "Pattern Matching",
			items: [
				{
					title: "Brute Force",
					key: "brute-force",
					url: "/brute-force",
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
					key: "linear-vectorial",
					url: "/linear-vectorial",
				},
				{
					title: "Single Linked",
					key: "linear-single-linked",
					url: "/linear-single-linked",
				},
				{
					title: "Double Linked",
					key: "linear-double-linked",
					url: "/linear-double-linked",
				},
				{
					title: "Improved Double Linked",
					key: "linear-improved-double-linked",
					url: "/linear-improved-double-linked",
				},
			],
		},
		{
			title: "Linear Data Structures",

			items: [
				{
					title: "Stack",
					key: "stack",
					url: "/stack",
				},
				{
					title: "Queue",
					key: "queue",
					url: "/queue",
				},
				{
					title: "Priority Queue",
					key: "priority-queue",
					url: "/priority-queue",
				},
				{
					title: "Heap",
					key: "heap",
					url: "/heap",
				},
			],
		},
		{
			title: "Sorting Algorithms",
			items: [
				{
					title: "Bubble Sort",
					key: "bubble-sort",
					url: "/bubble-sort",
				},
				{
					title: "Insertion Sort",
					key: "insertion-sort",
					url: "/insertion-sort",
				},
				{
					title: "Selection Sort",
					key: "selection-sort",
					url: "/selection-sort",
				},
				{
					title: "Quick Sort",
					key: "quick-sort",
					url: "/quick-sort",
				},
				{
					title: "Merge Sort",
					key: "merge-sort",
					url: "/merge-sort",
				},
				{
					title: "Heap Sort",
					key: "heap-sort",
					url: "/heap-sort",
				},
				{
					title: "Radix Sort",
					key: "radix-sort",
					url: "/radix-sort",
				},
				{
					title: "Counting Sort",
					key: "counting-sort",
					url: "/counting-sort",
				},
				{
					title: "Bucket Sort",
					key: "bucket-sort",
					url: "/bucket-sort",
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
							key: "linked-binary-tree",
							url: "/linked-binary-tree",
						},
						{
							title: "Vectorial",
							key: "vectorial-binary-tree",
							url: "/vectorial-binary-tree",
						},
						{
							title: "Double Linked",
							key: "double-linked-binary-tree",
							url: "/double-linked-binary-tree",
						},
					],
				},
				{
					title: "Traversals",
					url: "#",
					items: [
						{
							title: "Pre Order",
							key: "pre-order-traversal",
							url: "/pre-order-traversal",
						},
						{
							title: "In Order",
							key: "in-order-traversal",
							url: "/in-order-traversal",
						},
						{
							title: "Post Order",
							key: "post-order-traversal",
							url: "/post-order-traversal",
						},
					],
				},
				{
					title: "AVL trees",
					url: "#",
					items: [
						{
							title: "Insert",
							key: "avl-insert",
							url: "/avl-insert",
						},
						{
							title: "Delete",
							key: "avl-delete",
							url: "/avl-delete",
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
							key: "external-chaining-insert",
							url: "/external-chaining-insert",
						},
						{
							title: "Delete",
							key: "external-chaining-delete",
							url: "/external-chaining-delete",
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
							url: "/linear-probing",
						},
						{
							title: "Quadratic Probing",
							key: "quadratic-probing",
							url: "/quadratic-probing",
						},
						{
							title: "Double Rehashing",
							key: "double-rehashing",
							url: "/double-rehashing",
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
