import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
            process.env.S3_BUCKET_URL || "",
        ],
    },

    env: {
        DATABASE_USER: process.env.DATABASE_USER,
        DATABASE_PSW: process.env.DATABASE_PSW,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PORT: process.env.DATABASE_PORT,
        DATABASE_NAME: process.env.DATABASE_NAME,
        JWT_SECRET: process.env.JWT_SECRET,
        // REACT_AWS_KEY: process.env.REACT_AWS_KEY,
        // REACT_AWS_SECRET: process.env.REACT_AWS_SECRET,
        S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
        S3_BUCKET_URL: process.env.S3_BUCKET_URL,
        COOKIE_SECRET: process.env.COOKIE_SECRET,
        // REACT_APP_STRIPE_PUBLIC_KEY: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
        // REACT_APP_STRIPE_SECRET_KEY: process.env.REACT_APP_STRIPE_SECRET_KEY,
        // REACT_APP_PAYPAL_CLIENT_ID: process.env.REACT_APP_PAYPAL_CLIENT_ID,
        // RECAPTCHA_PUBLIC_KEY: process.env.RECAPTCHA_PUBLIC_KEY,
        RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
        EMAIL_URL: process.env.EMAIL_URL,
        DOMAIN: process.env.DOMAIN,
    },

    // webpack(config) {
    //     config.module.rules.push({
    //         test: /\.svg$/,
    //         use: ["@svgr/webpack"],
    //     });

    //     return config;
    // },
};

export default nextConfig;
