import session from "express-session";

import config from "../config";

export function initSessionMiddleware() {
    return session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    });
}

declare module "express-session" {
    interface SessionData {
        redirectTo: string;
    }
}

export {};
