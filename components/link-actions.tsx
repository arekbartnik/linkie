import { Archive, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function LinkActions() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<MoreVertical className="size-4" aria-label="Open menu" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuItem>
					<Pencil className="mr-2 size-4" />
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Archive className="mr-2 size-4" />
					Archive
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="text-red-500">
					<Trash2 className="mr-2 size-4" />
					Remove
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
