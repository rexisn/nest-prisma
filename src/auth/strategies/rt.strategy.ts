import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { env } from "process";
import { Request } from "express";

export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env.RT_SECRET_KEY,
            passReqToCallback: true,
        })



    }

    validate(req: Request, payload: any) {
        const refreshtoken = req.get("authozation").replace("Bearer", "").trim()
        return {
            ...payload,
            refreshtoken
        }
    }

}