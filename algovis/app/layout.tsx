import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Algorithme Visualiser",
	description: "Visualiser for the different algorithms of the VUB course Algo & Datastructure 1",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<SidebarProvider>
					<AppSidebar />

					<main className="flex-1">
						<SidebarTrigger />
						<div className="flex items-center justify-center min-h-screen">{children}</div>
					</main>
				</SidebarProvider>
			</body>
		</html>
		// <html lang="en" suppressHydrationWarning>

		// </html>
	);
}
