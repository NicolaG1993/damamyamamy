import fs from "fs";
import S3 from "@/utils/libs/s3";
import { IncomingForm } from "formidable";

import { isAdmin, isAuth } from "@/utils/auth";

// first we need to disable the default body parser
export const config = {
    api: {
        bodyParser: false,
    },
};

// midleware to parse formData -> file
const asyncParse = (req) =>
    new Promise((resolve, reject) => {
        const form = new IncomingForm({ multiples: true });
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });

async function handler(req, res) {
    try {
        const allPromises = [];
        const formData = await asyncParse(req);
        let { arrOfFiles } = formData.files;
        let { folder } = formData.fields;
        console.log("💚🔍 formData", formData);
        console.log("💚🔍 arrOfFiles", arrOfFiles);

        if (!arrOfFiles) {
            return res.send([]);
        }
        // non so perche ma quando sono file multipli torna un array di Files,
        // quando é singolo torna solo l'oggetto File 🧠
        if (!Array.isArray(arrOfFiles)) {
            arrOfFiles = [arrOfFiles];
        }

        // create a promise for every file
        arrOfFiles.map((image) => {
            const { originalFilename, mimetype, size, filepath } = image;
            const uploadParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                // ACL: "public-read",
                Key: `${folder}/${originalFilename}`,
                Body: fs.createReadStream(filepath),
                ContentType: mimetype,
                ContentLength: size,
            };
            const promise = S3.upload(uploadParams, (err, data) => {
                if (err) {
                    console.log("reject", err);
                    return err;
                } else {
                    console.log("resolve", data);
                    return data;
                }
            }).promise();
            allPromises.push(promise);
        });

        // resolve all promises
        Promise.all(allPromises)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                console.log("🧡🧡🧡 S3 UPLOAD ERROR!!", err);
                res.status(500).json({ err: "Error uploading to S3." });
            });
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ err: "Error occured." });
    }
}

export default isAuth(isAdmin(handler));
