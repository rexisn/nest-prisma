import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { env } from "process";
import { JwtPayload } from "../interfaces";

export class AtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: env.AT_SECRET_KEY
        })
    }

    validate(payload  : JwtPayload) {
        return payload
    }

}