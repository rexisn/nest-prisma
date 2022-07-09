import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { env } from "process";
import { Request } from "express";
import { JwtPayload } from "../interfaces";

export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env.RT_SECRET_KEY,
            passReqToCallback: true,
        })
    }

    validate(req: Request, payload: JwtPayload) {
        const refreshtoken = req.get("Authorization").replace("Bearer ", "").trim()
        return {
            ...payload,
            refreshtoken
        }
    }

}