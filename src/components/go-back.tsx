"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonStyles } from "./ui/button-styles";

export function GoBack() {
	const pathname = usePathname();
	const splitPath = pathname.split("/").slice(0, -1).join("/");

	if (splitPath.length === 0) {
		return null;
	}

	return (
		<Link
			href={pathname.split("/").slice(0, -1).join("/") || "/"}
			className={buttonStyles({ size: "sm" })}
		>
			<ChevronLeft className="-ml-1.5 !-mr-1 !size-6" /> Go back
		</Link>
	);
}
