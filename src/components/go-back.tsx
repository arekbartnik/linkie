"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { buttonStyles } from "./ui/button-styles";

export function GoBack() {
	const pathname = usePathname();
	const { back } = useRouter();
	const splitPath = pathname.split("/").slice(0, -1).join("/");

	if (splitPath.length === 0) {
		return null;
	}

	if (splitPath === "/links") {
		return (
			<Button
				onPress={() => back()}
				className={buttonStyles({ size: "sm", class: "cursor-pointer" })}
			>
				<ChevronLeft className="-ml-1.5 !-mr-1 !size-6" /> Go back
			</Button>
		);
	}

	return (
		<Link href={splitPath || "/"} className={buttonStyles({ size: "sm" })}>
			<ChevronLeft className="-ml-1.5 !-mr-1 !size-6" /> Go back
		</Link>
	);
}
