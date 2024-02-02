/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        IMGUR_API_ID: process.env.IMGUR_API_ID,
    },
}

module.exports = nextConfig
