import test from "ava";
import supertest from "supertest";
import { app } from "../app.js";

test("root path check", async (t) => {
    const res = await supertest(app).get("/").expect(200);
    t.deepEqual(res.body, { message: "Hello World!" });
});
