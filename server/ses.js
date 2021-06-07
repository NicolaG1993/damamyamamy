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

//completare con mie credential
exports.sendEmail = function (recipient, message, subject) {
    return ses
        .sendEmail({
            // whatever email address you verified should go here!
            Source: "da Mamy a Mamy <nicog.designer@gmail.com>",
            Destination: {
                ToAddresses: [recipient],
            },
            Message: {
                Body: {
                    Text: {
                        Data: message,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise()
        .then(() => console.log("ses.sendEmail worked!"))
        .catch((err) => console.log(err));
};

exports.contactUs = function (fname, lname, email, phone, message) {
    return ses
        .contactUs({
            // whatever email address you verified should go here!
            Source: `${lname} ${fname} <${email}>`,
            Destination: {
                ToAddresses: "nicog.designer@gmail.com",
            },
            Message: {
                Body: {
                    Text: {
                        Data: message,
                        Phone: phone,
                    },
                },
                Subject: {
                    Data: "Contatto via Sito",
                },
            },
        })
        .promise()
        .then(() => console.log("ses.contactUs worked!"))
        .catch((err) => console.log(err));
};
