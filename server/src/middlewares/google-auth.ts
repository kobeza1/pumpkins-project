import passport from "passport";
import { Strategy } from "passport-google-oauth2";
import { config } from "dotenv";
import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";

config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

const googleParams = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${BASE_URL}/auth/google/callback`,
    passReqToCallback: true,
};

const googleCallback = async (
    _req,
    _accessToken,
    _refreshToken,
    profile,
    done
) => {
    try {
        const { email, displayName } = profile;
        const user = await UserModel.findOne({ email });
        if (user) {
            return done(null, user); // req.user = user
        }
        const password = bcrypt.hash(v4(), 10);
        const newUser = await UserModel.create({
            email,
            password,
            name: displayName,
        });
        return done(null, newUser);
    } catch (error) {
        done(error, false);
    }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

export default passport;
