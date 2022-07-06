import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private AuthService : AuthService) {
        this.AuthService = AuthService
    }

    @Post("/user/signup")
    signup(){
        this.AuthService.signupLogic();
    }

    
    @Post("/user/login")
    login(){
        this.AuthService.loginLogic()
    }

    @Post("/logout")
    logout(){
        this.AuthService.logoutLogic()
    }

    @Post("/refreshtoken")
    refresh(){
        this.AuthService.refreshToken()

    }
}
