/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            }
        ]
    },
    experimental: {
        mdxRs: true,
    }
};

export default nextConfig;
