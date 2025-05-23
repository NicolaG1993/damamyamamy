import type { NextConfig } from "next";
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
    i18n: {
        localeDetection: false,
        locales: ["it"],
        defaultLocale: "it",
    },

    reactStrictMode: true,

    images: {
        domains: [
            // "res.cloudinary.com",
            // "s3.eu-south-1.amazonaws.com",
            // process.env.S3_BUCKET_URL || "",
            isDev ? process.env.SUPABASE_PROJECT_URL_DEV || "" : "",
            process.env.SUPABASE_PROJECT_URL_PROD || "",
        ],
    },

    env: {
        DATABASE_USER: process.env.DATABASE_USER,
        DATABASE_PSW: process.env.DATABASE_PSW,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PORT: process.env.DATABASE_PORT,
        DATABASE_NAME: process.env.DATABASE_NAME,
        JWT_SECRET: process.env.JWT_SECRET,
        SUPABASE_PROJECT_URL_DEV: process.env.SUPABASE_PROJECT_URL_DEV,
        SUPABASE_PROJECT_URL_PROD: process.env.SUPABASE_PROJECT_URL_PROD,
        SUPABASE_KEY: process.env.SUPABASE_KEY,
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
