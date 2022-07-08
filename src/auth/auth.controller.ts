import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/user.dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {
        this.AuthService = AuthService
    }

    @Post("user/signup")
    signup(@Body() dto: AuthDTO): Promise<Tokens | Error> {
        return this.AuthService.signupLogic(dto);
    }

    @Post("user/login")
    login(@Body() dto: AuthDTO) : Promise<Tokens>{
        return this.AuthService.login(dto)

    }

    @Patch("logout/:id")
    logout(@Param() id : number){
        return this.AuthService.logout(id) ;
        
    }
}   
