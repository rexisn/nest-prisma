import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/user.dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {
        this.AuthService = AuthService
    }

    @Post("/user/signup")
    signup(@Body() dto: AuthDTO): Promise<Tokens> {
        return this.AuthService.signupLogic(dto);
    }


}
