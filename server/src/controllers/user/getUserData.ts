// import { UserPumpkins } from "../../models/index.js";

// export const getUserData = async (
//     req: {
//         user: {
//             _id: String;
//             name: String;
//             email: String;
//             phone: Number;
//             avatarURL: String;
//         };
//     },
//     res: { status: Function }
// ) => {
//     const { _id: id, name, email, phone, avatarURL } = req.user;
//     const userPumpkins = await UserPumpkins.find({ owner: id });

//     res.status(200).json({
//         user: {
//             id,
//             name,
//             email,
//             phone,
//             avatarURL,
//         },
//         userPumpkins,
//     });
// };

