import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt'
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';




@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService) {
    }

    async signupLogic(dto: AuthDTO): Promise<Tokens> {
        const hash = await this.hashData(dto.password)

        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash: hash,
                hashedRt: ""
            }
        })
        const tokens = await this.getTokens(newUser.id, newUser.email)
        await this.updateToken(newUser.id , tokens.refresh_token)
        return tokens
    }
    async updateToken(id: number, refreshToken: string) {
        const hash = await this.hashData(refreshToken)
        return this.prisma.user.update({
            where: {
                id: id
            },
            data: {
                hashedRt: hash
            }
        })
    }

    //io_functions ==> utils
    async getTokens(userId: number, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email: email
            }, {
                secret: env.AT_SECRET_KEY,
                expiresIn: 60 * 15
            }),
            this.jwtService.signAsync({
                sub: userId,
                email: email
            }, {
                secret: env.AT_SECRET_KEY,
                expiresIn: 60 * 60 * 24
            })
        ])
        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }


    private hashData(data: string): Promise<string> {
        return bcrypt.hash(data, 10)
    }
}
