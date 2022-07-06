import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private AuthService : AuthService) {
        this.AuthService = AuthService
    }

    @Post("/user/signup")
    signup(){

    }

    
    @Post("/user/login")
    login(){
        
    }

    @Post("/logout")
    logout(){

    }

    @Post("/refreshtoken")
    refresh(){
        
    }
}
