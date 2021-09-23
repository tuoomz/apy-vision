import {
	BadRequestException,
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	NotFoundException,
	Post,
	Req,
	Res,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	@UseInterceptors(ClassSerializerInterceptor)
	@Post('register')
	async register(@Body() data: RegisterDto) {
		if (data.password !== data.password_confirm) {
			throw new BadRequestException('Passwords do not match');
		}

		const hash = await bcrypt.hash(data.password, 10);

		const user = await this.userService.create({
			email: data.email,
			password: hash,
		});
		return user;
	}

	@UseInterceptors(ClassSerializerInterceptor)
	@Post('login')
	async login(
		@Body('email') email: string,
		@Body('password') password: string,
		@Res({ passthrough: true }) response: Response,
	) {
		const user = await this.userService.findOne({ email: email });
		if (!user) {
			throw new NotFoundException('User not found');
		}

		if (!(await bcrypt.compare(password, user.password))) {
			throw new BadRequestException('Invalid Password');
		}

		const jwt = await this.jwtService.signAsync({ id: user.id });

		response.cookie('jwt', jwt, {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});

		return user;
	}

	@UseInterceptors(ClassSerializerInterceptor)
	@Get('user')
	async user(@Req() request: Request) {
		const cookie = request.cookies['jwt'];

		const data = await this.jwtService.verifyAsync(cookie);
		const id = data.id;
		const user = await this.userService.findOne({
			where: { id: id },
			relations: ['portfolio'],
		});
		return user;
	}

	@UseGuards(AuthGuard)
	@Post('logout')
	async logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie('jwt');

		return { message: 'Success' };
	}
}
