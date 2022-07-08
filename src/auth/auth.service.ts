import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt'
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { NotFoundError } from 'rxjs';




@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService) {
    }

    //signup with email and password
    async signupLogic(dto: AuthDTO): Promise<Tokens |Error > {
        const emialMatch  = await this.prisma.user.findUnique({
            where : {
                email : dto.email
            }
        })
        if(emialMatch) throw new ConflictException("Email already registered try login")
        const hash = await this.hashData(dto.password)
        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash: hash,
                hashedRt: ""
            }
        })
        const tokens = await this.getTokens(newUser.id, newUser.email)
        await this.updateToken(newUser.id, tokens.refresh_token)
        return tokens
    }
    protected async updateToken(id: number, refreshToken: string) {
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

    //login with email and password
    async login(dto: AuthDTO) : Promise<Tokens> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if (!user) throw new NotFoundException("Such user doesn't exist")
        const passwordmatches = await bcrypt.compare(dto.password, user.hash)
        if (!passwordmatches) throw new NotFoundException("Such user not found")

        const tokens = await this.getTokens(user.id, user.email)
        this.updateToken(user.id, tokens.refresh_token)

        return tokens;

        // return tokens
    }



    //logout the user by removing the refresh token and the access token
    async logout(id : number){
        await this.prisma.user.update({
            where :{
                id : id ,             },
            data : {
                hashedRt : null
            }
        })
        return { status : 200  , message : "Logged out successfully"}
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
