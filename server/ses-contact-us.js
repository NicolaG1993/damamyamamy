const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets");
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-central-1",
});

exports.sendEmail = function (fname, lname, email, phone, message) {
    return ses
        .sendEmail({
            // whatever email address you verified should go here!
            Source: "da Mamy a Mamy <nicog.designer@gmail.com>",
            Destination: {
                ToAddresses: ["nicog.designer@gmail.com"],
            },

            Message: {
                Body: {
                    Html: {
                        // HTML Format of the email
                        Charset: "UTF-8",
                        Data: `<html>
                                 <body>
                                   From: ${fname} ${lname}
                                   <br />
                                   Message: ${message}
                                   <br />
                                   Email: ${email}
                                   <br />
                                   Phone: ${phone}
                                 </body>
                                </html>`,
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: "",
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: "From Contact Form",
                },
            },
        })
        .promise()
        .then((data) => {
            console.log("ses-contact-us worked!");
            console.log("email submitted to SES", data);
            //questa parte dello status code devo ancora capirla
            //come lo uso?
            //poi devo prendere il body ed portarlo front end per renderizzarlo?

            return {
                statusCode: 200,
                body: `Message sent`,
            };
        })
        .catch((err) => {
            console.log("error in ses-contact-us", err);
            return {
                //ricevo 200 anche se catch si attiva, why?
                statusCode: 500,
                body: `Message unsuccesfully sent, error: ${err}`,
                error: err,
            };
        });
};
