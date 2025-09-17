"use client";
import * as React from "react";
import { GalleryVerticalEnd, Minus, Plus } from "lucide-react";

import { data } from "../data";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	// const [idx, setIdx] = React.useState(-1);
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<GalleryVerticalEnd className="size-4" />
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-medium">Algo Visualiser</span>
									{/* <span className="">v1.0.0</span> */}
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				{/* <SearchForm /> */}
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{data.navMain.map((item) => (
							<Collapsible
								key={item.title}
								// defaultOpen={index === idx}
								// onOpenChange={(isOpen) => setIdx(isOpen ? index : -1)}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton>
											{item.title}{" "}
											<Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
											<Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									{item.items?.length ? (
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items.map((subitem) => (
													<React.Fragment key={subitem.title}>
														{"items" in subitem && subitem.items?.length ? (
															<Collapsible className="group/subcollapsible">
																<SidebarMenuSubItem>
																	<CollapsibleTrigger asChild>
																		<SidebarMenuSubButton>
																			{subitem.title}
																			<Plus className="ml-auto group-data-[state=open]/subcollapsible:hidden" />
																			<Minus className="ml-auto group-data-[state=closed]/subcollapsible:hidden" />
																		</SidebarMenuSubButton>
																	</CollapsibleTrigger>
																</SidebarMenuSubItem>
																<CollapsibleContent>
																	<SidebarMenuSub>
																		{subitem.items.map((subsubitem) => (
																			<SidebarMenuSubItem key={subsubitem.title}>
																				<SidebarMenuSubButton asChild>
																					<Link
																						href={
																							subsubitem.url
																							// "url" in subsubitem
																							// 	? subsubitem.url
																							// 	: "url" in subsubitem
																							// 	? subsubitem.url
																							// 	: "#"
																						}
																					>
																						{subsubitem.title}
																					</Link>
																				</SidebarMenuSubButton>
																			</SidebarMenuSubItem>
																		))}
																	</SidebarMenuSub>
																</CollapsibleContent>
															</Collapsible>
														) : (
															<SidebarMenuSubItem>
																<SidebarMenuSubButton asChild>
																	<Link href={subitem.url}>{subitem.title}</Link>
																</SidebarMenuSubButton>
															</SidebarMenuSubItem>
														)}
													</React.Fragment>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									) : null}
								</SidebarMenuItem>
							</Collapsible>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
