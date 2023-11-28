const jwt = require("jsonwebtoken");

const config = {
    pass: process.env.JWT_PASS,

    options: {
        expiresIn: "1hr"
    }
}

module.exports = {
    createToken: data => jwt.sign(data, config.pass, config.options),

    getUsuario: token => {
        try {
            const {id} = jwt.verify(token, config.pass);

            return id;

        } catch (error) {
            return
        }
    }
}