import AWS from "aws-sdk";

// create S3 instance with credentials
AWS.config.update({
    accessKeyId: process.env.REACT_AWS_KEY,
    secretAccessKey: process.env.REACT_AWS_SECRET,
    region: "eu-south-1",
});
const S3 = new AWS.S3();

export default S3;

// declare parameters for upload -> in api route?
/*
const uploadParams = {
    Bucket: "oscarexpert",
    Key: "asdf.jpg",
    Body: formData,
    ContentType: "image/jpeg",
    ACL: "public-read",
};
*/

// execute upload -> in api route?
/*
  S3.upload(uploadParams, (err, data) => {
    if (err) return console.log('reject', err)
    else return console.log('resolve', data)
  })
*/
