import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator"

export class  AuthDTO {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    public email : string

    @IsNotEmpty()
    @IsString()
    public password : string
}   