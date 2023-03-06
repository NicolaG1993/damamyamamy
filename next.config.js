/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        localeDetection: false,
        locales: ["it"],
        defaultLocale: "it",
    },

    reactStrictMode: true,

    images: {
        domains: [
            "res.cloudinary.com",
            "s3.eu-south-1.amazonaws.com",
            process.env.S3_BUCKET_URL,
        ],
    },

    env: {
        DATABASE_USER: process.env.DATABASE_USER,
        DATABASE_PSW: process.env.DATABASE_PSW,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PORT: process.env.DATABASE_PORT,
        DATABASE_NAME: process.env.DATABASE_NAME,
        REACT_AWS_KEY: process.env.REACT_AWS_KEY,
        REACT_AWS_SECRET: process.env.REACT_AWS_SECRET,
        S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
        S3_BUCKET_URL: process.env.S3_BUCKET_URL,
        COOKIE_SECRET: process.env.COOKIE_SECRET,
        DEV_DATABASE_USER: process.env.DEV_DATABASE_USER,
        DEV_DATABASE_PSW: process.env.DEV_DATABASE_PSW,
        DEV_DATABASE_HOST: process.env.DEV_DATABASE_HOST,
        DEV_DATABASE_PORT: process.env.DEV_DATABASE_PORT,
        DEV_DATABASE_NAME: process.env.DEV_DATABASE_NAME,
        REACT_APP_STRIPE_PUBLIC_KEY: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
        REACT_APP_STRIPE_SECRET_KEY: process.env.REACT_APP_STRIPE_SECRET_KEY,
        REACT_APP_PAYPAL_CLIENT_ID: process.env.REACT_APP_PAYPAL_CLIENT_ID,
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
