const { User } = require("../../models");
const HttpError = require("../../helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (
    req: { body: { email: String; password: String } },
    res: { json: Function }
) => {
    const { email, password } = req.body;
    const user: { password: String; _id: String; name: String; email: String } =
        await User.findOne({ email });
    if (!user) {
        throw HttpError(409, "There is no user with such date");
    }
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!passCompare) {
        throw HttpError(401, "Password is wrong");
    }

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        status: "success",
        code: 200,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
};

module.exports = login;
