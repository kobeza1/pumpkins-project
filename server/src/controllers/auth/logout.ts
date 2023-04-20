const { User } = require("../../models");

const logout = async (
    req: { user: { _id: String } },
    res: { status: Function }
) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
};

module.exports = logout;
