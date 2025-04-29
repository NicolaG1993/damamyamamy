// export const COLORS = {
//     primary: "#0070f3",
//     secondary: "#1c1c1e",
//     background: "#ffffff",
//     bg000: "#ffffff",
//     bg100: "#ffffff",
//     bg200: "#ffffff",
//     bg300: "#ffffff",
//     bg400: "#ffffff",
// }; // Per usare questo dovremmo creare il file css via js - xk non é possibile importare questi in module.css (credo)

export const BREAKPOINTS = {
    mobile: 480, // px
    tablet: 768, // px
    desktop: 1024, // px
};

export const NO_IMAGE = `https://${process.env.SUPABASE_PROJECT_URL_PROD}/storage/v1/object/public/assets//no-image.png`;
