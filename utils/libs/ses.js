const aws = require("aws-sdk");
const SES = new aws.SES({
    accessKeyId: process.env.REACT_AWS_KEY,
    secretAccessKey: process.env.REACT_AWS_SECRET,
    region: "eu-south-1",
});

export default SES;

export function contactUs({
    recipient,
    source,
    message,
    subject,
    first,
    last,
    phone,
}) {
    return SES.sendEmail({
        Source: source,
        Destination: {
            ToAddresses: [recipient],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    // Data: 'This message body contains HTML formatting. It can, for example, contain links like this one: <a class="ulink" href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide" target="_blank">Amazon SES Developer Guide</a>.',
                    Data: `<html>
                                <body>
                                    Mittente: ${first} ${last}
                                    <br />
                                    Email: ${recipient}
                                    <br />
                                    Telefono: ${phone || "nessuno"}
                                    <br />
                                    <br />
                                    Messaggio: ${message}
                                </body>
                            </html>`,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "",
                    // Data: message,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            },
        },
    })
        .promise()
        .then((res) => ({ ...res, emailSended: true }))
        .catch((err) => {
            console.log("err in ses.sendEmail: ", err);
            return {
                statusCode: 500,
                body: `Message unsuccesfully sent, error: ${err}`,
                error: err,
            };
        });
}

export function sendEmail({
    recipient,
    source,
    message,
    subject,
    // first,
    // last,
    // phone,
}) {
    return SES.sendEmail({
        Source: source,
        Destination: {
            ToAddresses: [recipient],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<html>
                                <body>
                                    <h1>Da Mamy a Mamy</h1>
                                    <p>Vicolo Teatro, 4, 37010</p>
                                    <p>Cavaion, Verona, IT</p>
                                    <ul>
                                        <li>
                                            <a href="tel:+393479792644">(+39) 347 9792 644</a>
                                        </li>
                                        <li>
                                            <a href="mailto:damamyamamy@gmail.com">damamyamamy@gmail.com</a>
                                        </li>
                                        <li>
                                            <a href="www.damamyamamy.com">www.damamyamamy.com</a>
                                        </li>
                                    </ul>
                                    <br />
                                    <br />
                                    <div>${message}</div>
                                    <br />
                                    <p>Da Mamy a Mamy</p>
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
                Data: subject,
            },
        },
    })
        .promise()
        .then((res) => ({ ...res, emailSended: true }))
        .catch((err) => {
            console.log("err in ses.sendEmail: ", err);
            return {
                statusCode: 500,
                body: `Message unsuccesfully sent, error: ${err}`,
                error: err,
            };
        });
}
