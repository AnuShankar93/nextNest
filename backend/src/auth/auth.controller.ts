import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDTO) {
        const token = await this.authService.login(loginDto);
        return { token };
    }

  @Post('register')
    async register(
        @Body() createUserDto: CreateUserDto
    ): Promise<{token :string}> {
        const token =  await this.authService.register(createUserDto);
        return { token }; // Return the generated JWT token
    }

    @Get('profile')
    getProfile() {
        // Logic to get user profile
        return { message: 'User profile retrieved successfully' };
    }
}
