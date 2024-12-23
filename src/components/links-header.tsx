"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { buttonStyles } from "./ui/button-styles";

export function LinksHeader() {
	const router = useRouter();

	useHotkeys("n", () => router.push("/links/add-link"));

	return (
		<div className="flex justify-between items-center mb-8 sticky top-3 z-10">
			<h1 className="text-4xl font-extrabold font-impact">Links</h1>
			<Link
				href="/links/add-link"
				className={cn(
					buttonStyles({ variant: "default", size: "lg" }),
					"!bg-[hsl(var(--yellow-3-hsl)/100%)] text-black inline-flex items-center gap-2 transition-all duration-200",
				)}
			>
				Add New Link
				<kbd className="-mr-2 pointer-events-none inline-flex h-5 select-none items-center rounded bg-stone-800/10 px-1.5 font-mono text-[10px] font-medium">
					N
				</kbd>
			</Link>
		</div>
	);
}
