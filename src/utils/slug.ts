// generate automatic slug from title
export const generateSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
};

// sanitize title or custom slug
export const sanitizeName = (title: string) => {
    return title
        .trim()
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_-]/g, "");
};

// sanitize file name
export const sanitizeFileName = (fileName: string) => {
    return fileName.replace(/\s+/g, "_");
};
