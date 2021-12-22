import S3 from "../../../shared/libs/s3";
import { deleteProductImages } from "../../../shared/utils/db/db";

export default async function handler(req, res) {
    var deleteParams = {
        Bucket: "dmam-items",
        Delete: {
            Objects: req.body.keys.map((el) => ({ Key: el })),
        },
    };

    const promise = S3.deleteObjects(deleteParams, (err, data) => {
        if (err) {
            console.log("reject", err);
            // console.log(err, err.stack);
            return err;
        } else {
            console.log("resolve", data);
            return data;
        }
    }).promise();

    promise
        .then(async (resp) => {
            console.log("amazon delete is complete!!!", resp);
            console.log("😋😭 req.body:", req.body);

            // se eliminato da S3 deve essere eliminato anche da item in db
            // e torno item nuovo
            let updateImages = await deleteProductImages(
                req.body.id,
                JSON.stringify(req.body.newImages)
            );
            console.log("updateImages:", updateImages);
            updateImages = updateImages.rows[0].images;

            res.status(200).json(updateImages); // torno solo la nuova array di immagini di product
        })
        .catch((err) => {
            console.log("err", err);
            return res.status(500).json({ message: err.message });
        });
}
