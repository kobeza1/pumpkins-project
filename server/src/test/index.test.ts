import test from "ava";
import supertest from "supertest";
import { app } from "../app.js";
import { UserModel } from "../models/user.js";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

import { config } from "dotenv";

config();
//  разделить енв для тестов и прода
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

test("root path check", async (t) => {
    const res = await supertest(app).get("/").expect(200);
    t.deepEqual(res.body, { message: "Hello World!" });
});

// test("register", async (t) => {
//     const res = await supertest(app).post("/auth/register").send({
//         password,
//         email,
//         name,
//         phone,
//     });
//     t.regex(res.body.user.avatarURL, /\^https:\/\/gravatar\.com/);
//     t.regex(res.body.user.id, /\w+/);
//     t.like(res.body, {
//         status: 201,
//         user: {
//             email,
//             name,
//         },
//     });

//     const userCreated = await UserModel.findById(res.body.user.id);
//     t.is(userCreated?.email, email);
//     t.is(userCreated?.name, name);
//     t.is(userCreated?.phone, phone);
// });

// test("register", async (t) => {
//     const res = await supertest(app).post("/auth/register").send({
//         password,
//         email,
//         name,
//         phone,
//     });
//     t.regex(res.body.user.avatarURL, /\^https:\/\/gravatar\.com/);
//     t.regex(res.body.user.id, /\w+/);
//     t.like(res.body, {
//         status: 201,
//         user: {
//             email,
//             name,
//         },
//     });

//     const userCreated = await UserModel.findById(res.body.user.id);
//     t.is(userCreated?.email, email);
//     t.is(userCreated?.name, name);
//     t.is(userCreated?.phone, phone);
// });

test("get current user", async (t) => {
    const email = faker.internet.email();
    const name = faker.name.firstName();
    const password = faker.random.alpha();
    const user = await UserModel.create({ email, name, password });

    const payload = {
        id: user._id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
        expiresIn: "3m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
        expiresIn: "7d",
    });

    await UserModel.findByIdAndUpdate(user._id, { accessToken, refreshToken });

    const res = await supertest(app)
        .get("/user/currentUser")
        .set("authorization", `Bearer ${accessToken}`);

    t.like(res.body, {
        user: {
            id: user.id,
            name,
            email,
        },
    });
    // console.log(res.body);

    // t.truthy(res.body.user._id);
});
