/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'images.unsplash.com',
            'lh3.googleusercontent.com' // for NextAuth Google profile images
        ],
    },
};

module.exports = nextConfig;
