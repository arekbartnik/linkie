"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyUrlButtonProps {
	url: string;
}

export function CopyUrlButton({ url }: CopyUrlButtonProps) {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (error) {
			console.error("Failed to copy: ", error);
		}
	};

	return (
		<button
			onClick={handleCopy}
			className="text-blue-500 hover:text-blue-600 transition-colors"
			aria-label={isCopied ? "Copied to clipboard" : "Copy URL"}
		>
			{isCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
		</button>
	);
}
