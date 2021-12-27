import jwt from "jsonwebtoken";

function signToken(user) {
    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            is_admin: user.is_admin,
        },
        process.env.secretCookie,
        {
            expiresIn: "30d",
        }
    );
}

const isAuth = (handler) => {
    return async (req, res, next) => {
        console.log("isAuth middleware activated");
        const { authorization } = req.headers; //passiamo token via headers (vedi placeorder.js)
        if (authorization) {
            //Bearer xxx => xxx
            const token = authorization.slice(7, authorization.length);
            jwt.verify(token, process.env.secretCookie, (err, decode) => {
                if (err) {
                    res.status(401).send({ message: "Token is not valid" });
                } else {
                    //decodificare token per avere i valori di user id, email e isAdmin
                    req.user = decode;
                    console.log("isAuth req.user: ", req.user);
                    // next();
                    return handler(req, res);
                }
            });
        } else {
            res.status(401).send({ message: "Token is not supplied" });
        }
    };
};

const isAdmin = (handler) => async (req, res, next) => {
    console.log("isAdmin middleware activated");
    if (req.user.is_admin) {
        // next();
        return handler(req, res);
    } else {
        res.status(401).send({ message: "User is not admin" });
    }
};

export { signToken, isAuth, isAdmin };
