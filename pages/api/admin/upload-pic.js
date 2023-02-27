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
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });

async function handler(req, res) {
    try {
        // ...
        // setup S3
        // parse formData
        // upload to bucket
        // accepts multiple files or just 1

        const formData = await asyncParse(req);
        let { files } = formData;
        let { folder } = formData.fields;
        const allPromises = [];
        console.log("💚🔍files", files);
        // ...
        // servono i params per piu uploads
        const uploadParams = {};
        // ...
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ err: "Error occured." });
    }
}

export default isAuth(isAdmin(handler));
