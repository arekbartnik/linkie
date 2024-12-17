import type { NextConfig } from "next";

const config: NextConfig = {
	poweredByHeader: false,
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	// experimental: {
	// 	dynamicIO: true,
	// },
};

export default config;
