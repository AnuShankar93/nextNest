import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private userService: UsersService) {}

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
    @UseGuards(AuthGuard('jwt')) // Ensure the user is authenticated this AUthGuard checks the JWT token and it is from passport    
    async getProfile(@Req() req:any): Promise<{email:string, firstName?: string, lastName?: string}> {
        const user = await this.userService.findUserByEmail(req.user.email);
        if(!user) {
            throw new UnauthorizedException('User not found');
        }
        // Logic to get user profile
        return { email: user?.email, firstName: user?.firstName, lastName: user?.lastName }; // Return user profile information
    }
}
