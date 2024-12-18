import { getLinks } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { CopyUrlButton } from "./copy-url-button";
import { LinkActions } from "./link-actions";
import { buttonStyles } from "./ui/button-styles";
import { Card } from "./ui/card";

export async function LinksList() {
	const links = await getLinks();

	return (
		<div className="mx-auto max-w-2xl w-full">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-extrabold">Links</h1>
				<Link
					href="/links/add-link"
					className={cn(
						buttonStyles({ variant: "default", size: "lg" }),
						"!bg-amber-300 text-black hover:!bg-amber-400",
					)}
				>
					Add New Link
				</Link>
			</div>

			{links?.map((link) => (
				<Card
					key={link.id}
					className="relative mb-8 p-8 border-1 border-stone-300 flex gap-8 overflow-hidden"
				>
					<div className="flex flex-col gap-2 flex-1 min-w-0">
						<p className="text-xl font-semibold line-clamp-2 text-balance">
							{link.name}
						</p>

						<div className="flex items-center gap-2">
							<a
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 hover:underline inline-flex items-center gap-1 min-w-0"
							>
								<span className="truncate">{link.url}</span>
								<ExternalLink
									className="size-4 shrink-0"
									aria-label="Opens in new tab"
								/>
							</a>
							<div className="shrink-0 w-4 flex">
								<CopyUrlButton url={link.url} />
							</div>
						</div>
					</div>

					{link.preview_image?.includes("https://") && (
						<div className="after:left-[-1px] select-none w-[200px] -m-8 flex justify-center items-center shrink-0 relative after:absolute after:inset-0 after:gradient-overlay">
							<img
								className="absolute inset-0 object-cover size-full"
								src={link.preview_image}
								alt={link.name}
								width={200}
								height={200}
							/>
						</div>
					)}

					<div className="flex justify-end absolute top-0.5 left-0.5">
						<LinkActions id={link.id} />
					</div>
				</Card>
			))}
		</div>
	);
}
