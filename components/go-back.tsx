"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

export function GoBack() {
	const pathname = usePathname();

	return (
		<Link
			href={pathname.split("/").slice(0, -1).join("/") || "/"}
			className={buttonVariants({ size: "sm" })}
		>
			<ChevronLeft className="-ml-1.5 !-mr-1 !size-6" /> Go back
		</Link>
	);
}
