import { UserModel } from "../../models/index.js";

export const logout = async (
    req: { user: { _id: String } },
    res: { status: Function }
) => {
    const { _id } = req.user;
    await UserModel.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
};
