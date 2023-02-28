/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    images: {
        domains: [
            "res.cloudinary.com",
            "s3.eu-south-1.amazonaws.com",
            process.env.S3_BUCKET_URL,
        ],
    },

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};

module.exports = nextConfig;
