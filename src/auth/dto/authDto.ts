import { isEmail, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/[0-9]/g)
    @Matches(/[a-zA-Z]/g)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(60)
    name: string;
}

export class SignInDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}