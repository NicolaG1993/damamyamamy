import fs from "fs";
import { IncomingForm } from "formidable";
import S3 from "../../../shared/libs/s3";

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

export default async function handler(req, res) {
    //devo passare il file singolo e caricarlo su S3
    //una volta effettuato il caricamento fare update item.images in db
    //immagini restano caricate anche se user non preme conferma
    //se user dopo preme annulla vengono eliminate da db e S3
    ////mi chiedo se esiste un modo per metterle tipo in attesa
    /*
    
    user seleziona file
    preme carica e viene caricato su S3
    link di img viene aggiunta a state in component, quindi map la rende visibile
    
    se user preme annulla o non preme conferma eliminare pic da S3
    db update solo dopo che use preme conferma
    
    */

    // if (!req.file) {
    //     return res.status(500).json({ message: "nessun file selezionato!" });
    // }

    const formData = await asyncParse(req);
    // console.log("formData in upload-pic: ", formData);
    const { originalFilename, mimetype, size, filepath } = formData.files.file;

    const uploadParams = {
        Bucket: "dmam-items",
        ACL: "public-read",
        Key: originalFilename,
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

    promise
        .then((resp) => {
            console.log("amazon upload is complete!!!", resp);
            // resp.picUrl = `https://dmam-items.s3.eu-south-1.amazonaws.com/${originalFilename}`;
            //
            // delete the img you just uploaded to aws from uploads folder - this is optional!
            // ...
            // fare qua update db? -> mi servirá slug del prodotto
            res.status(200).json(resp);
        })
        .catch((err) => {
            console.log("err", err);
            return res.status(500).json({ message: err.message });
        });
    // use S3.putObject instead of S3.upload for small files (under 15MB)
}

/*

• Client POST req to API
• multer middleware ?
• S3 middleware (auth+upload)
• API handle response
• client receive data
• update db on confirm changes, or delete img

*/
