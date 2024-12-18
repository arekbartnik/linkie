"use client";

import { removeLinkAction } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Archive, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import {
	Button,
	Keyboard,
	Menu,
	MenuItem,
	MenuTrigger,
	Popover,
} from "react-aria-components";
import { useHotkeys } from "react-hotkeys-hook";

export function LinkActions({ id }: { id: number }) {
	let [openMenu, setOpenMenu] = useState(false);
	useHotkeys("r", () => openMenu && removeLinkAction({ id }), [openMenu, id]);

	return (
		<MenuTrigger isOpen={openMenu} onOpenChange={setOpenMenu}>
			<Button className="p-2 rounded-full">
				<MoreVertical className="size-4" aria-label="Open menu" />
			</Button>
			<Popover
				className={cn(
					"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				)}
			>
				<Menu>
					<MenuItem
						onAction={() => alert("open")}
						className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"
					>
						<Pencil className="mr-2 size-4" />
						Edit
					</MenuItem>
					<MenuItem
						onAction={() => alert("rename")}
						className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"
					>
						<Archive className="mr-2 size-4" />
						Archive
					</MenuItem>

					<MenuItem
						onAction={() => removeLinkAction({ id })}
						className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"
					>
						<Trash2 className="mr-2 size-4" />
						<span className="text-red-600">Remove</span>
						<Keyboard className="text-xs bg-amber-200 rounded-md px-1.5 font-bold font-ca">
							R
						</Keyboard>
					</MenuItem>
				</Menu>
			</Popover>
		</MenuTrigger>
	);
}
