/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
        domains: ['books.google.com'],
    },
    env: {
        BASE_URL: process.env.BASE_URL,
    }
};

export default nextConfig;
