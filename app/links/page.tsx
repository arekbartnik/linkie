import { CopyUrlButton } from "@/components/copy-url-button";
import { LinkActions } from "@/components/link-actions";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import { createClient } from "@/utils/supabase/server";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function LinksPage() {
	const supabase = await createClient();
	const { data: links } = await supabase
		.from("links")
		.select("id, name, url, preview_image, tags (id, name)")
		.order("id", { ascending: false });

	return (
		<div className="mx-auto max-w-2xl w-full">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-extrabold">Links</h1>
				<Link
					href="/links/add-link"
					className={cn(
						buttonVariants({ variant: "default", size: "lg" }),
						"!bg-amber-300 text-black",
					)}
				>
					Add New Link
				</Link>
			</div>

			{links?.map((link) => (
				<Card
					key={link.id}
					className="relative mb-8 p-8 border-1 border-stone-300 flex gap-4 overflow-hidden"
				>
					<div className="flex flex-col gap-2 flex-1">
						<p className="text-xl font-semibold">{link.name}</p>

						<div className="flex items-center gap-2">
							<a
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 hover:underline inline-flex items-center gap-1"
							>
								{link.url}
								<ExternalLink className="size-4" aria-label="Opens in new tab" />
							</a>
							<CopyUrlButton url={link.url} />
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
						<LinkActions />
					</div>
				</Card>
			))}
		</div>
	);
}
