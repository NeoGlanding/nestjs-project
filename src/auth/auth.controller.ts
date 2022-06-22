import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, SignInDTO } from './dto/authDto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('test')
    testGet() {
        return this.authService.getAll()
    }

    @Post('login')
    @HttpCode(200)
    login(@Body() dto: SignInDTO) {
        return this.authService.signin(dto);
    }

    @Post('register')
    register(@Body() dto: AuthDTO) {
        return this.authService.signup(dto);
    }

}
