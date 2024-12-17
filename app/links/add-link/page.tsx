"use client";

import { Input } from "@/components/ui/input";
import { addLinkAction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddLinkPage() {
	const [url, setUrl] = useState("");
	const [name, setName] = useState("");

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		await addLinkAction({ url, name });
	};

	return (
		<div className="border border-stone-200 rounded-3xl p-16 bg-white">
			<h1 className="text-3xl font-extrabold mb-8">Add New Link</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
						URL
					</label>
					<Input
						type="url"
						id="url"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
						Name
					</label>
					<Input
						id="name"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<button
					type="submit"
					className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Add Link
				</button>
			</form>
		</div>
	);
}
