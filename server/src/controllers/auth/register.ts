const { User } = require("../../models");
const gravatar = require("gravatar");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { HttpError } = require("../../helpers");

const register = async (
    req: {
        body: { password: String; email: String; phone: String; name: String };
    },
    res: { json: any }
) => {
    const { password, email, name, phone } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Provided email already exists");
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
        password: hashPassword,
        email,
        name,
        phone,
        avatarURL,
    });

    res.json({
        status: 201,
        user: {
            id: newUser._id,
            email,
            name,
            avatarURL,
        },
    });
};

module.exports = register;
