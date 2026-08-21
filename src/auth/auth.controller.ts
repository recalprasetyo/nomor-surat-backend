import { Controller, Post, Req, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body() registerDto: RegisterDto,
    @Req() req: Request,
  ): Promise<any> {
    const user = await this.authService.registerUser(registerDto);

    return {
      status: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: user,
      timestamp: new Date().toISOString(),
      path: req.url,
    };
  }

  @Post('login')
  async loginUser(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
  ): Promise<any> {
    const user = await this.authService.loginUser(loginDto);

    return {
      status: HttpStatus.OK,
      message: 'User logged in successfully',
      data: user,
      timestamp: new Date().toISOString(),
      path: req.url,
    };
  }
}
