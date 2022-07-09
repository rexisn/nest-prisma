import { Body, Controller, HttpCode, HttpStatus, Patch, Post,Req, UseGuards } from '@nestjs/common';
import {Request  } from 'express'
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/user.dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {
        this.AuthService = AuthService
    }

    @Post('user/signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: AuthDTO): Promise<Tokens | Error> {
        return this.AuthService.signupLogic(dto);
    }

    @Post('users/login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: AuthDTO) : Promise<Tokens>{
        return this.AuthService.login(dto)

    }

    @Patch('logout/:id')
    @UseGuards(AuthGuard("jwt"))
    @HttpCode(HttpStatus.OK)
    logout(@Req() req : Request) {
        const user = req.user
        return this.AuthService.logout(user["id"]) ;
        
    }


    // @Patch('refresh')
    // @UseGuards(AuthGuard('jwt-refresh'))
    // refresh(@Req() req : Request){
    //     const user = req.user
    //     console.log(user)
    //     return  this.AuthService.refresh(user["id"] , user["refreshtoken"])

    // }

    
    @Patch('refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    refresh(@Req() req : Request){
        const user = req.user
        console.log(user)
        return  this.AuthService.refresh(user["id"] , user["refreshtoken"])

    }
}   
