/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
	images: {
        domains: ['books.google.com'],
        unoptimized: true,
    },
    env: {
        BASE_URL: process.env.BASE_URL,
    }
};

export default nextConfig;
