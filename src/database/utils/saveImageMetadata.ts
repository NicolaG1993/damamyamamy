import { PoolClient } from "pg";

interface ImageMetadata {
    url: string;
    key: string;
    uploadedBy: number;
}

export async function saveImageMetadata(
    client: PoolClient,
    metadata: ImageMetadata
): Promise<number> {
    try {
        const query = `
            INSERT INTO images (url, key, uploaded_by)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;
        const values = [metadata.url, metadata.key, metadata.uploadedBy];

        const res = await client.query(query, values);

        if (!res.rows || res.rows.length === 0) {
            throw new Error(
                "Errore durante il salvataggio dei metadati dell'immagine."
            );
        }

        return res.rows[0].id;
    } catch (error) {
        console.error("Errore salvataggio metadati immagine:", error);
        throw error;
    }
}
