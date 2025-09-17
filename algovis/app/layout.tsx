import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import { ThemeProvider } from "@/components/theme-provider";

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
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					// disableTransitionOnChange
				>
					<SidebarProvider>
						<AppSidebar />

						<main className="flex-1">
							<header className="flex h-16 shrink-0 items-center gap-2 px-4">
								<SidebarTrigger className="-ml-1" />
								{/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
								<DynamicBreadcrumb />
							</header>

							<div className="flex items-center justify-center min-h-screen">{children}</div>
						</main>
					</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
		// <html lang="en" suppressHydrationWarning>

		// </html>
	);
}
