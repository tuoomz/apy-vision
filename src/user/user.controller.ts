import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Param,
	Post,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PortfolioDto } from 'src/portfolio/models/portfolio.dto';
import { Portfolio } from 'src/portfolio/models/portfolio.entity';
import { User } from './models/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	@UseGuards(AuthGuard)
	@UseInterceptors(ClassSerializerInterceptor)
	@Get()
	async all(): Promise<User[]> {
		return this.userService.all();
	}

	@UseGuards(AuthGuard)
	@UseInterceptors(ClassSerializerInterceptor)
	@Get(':id')
	async get(@Param('id') id: number): Promise<User> {
		return this.userService.findOne(id);
	}

	@UseGuards(AuthGuard)
	@UseInterceptors(ClassSerializerInterceptor)
	@Post('/portfolio')
	async addPortfolio(@Body() data: PortfolioDto): Promise<User> {
		return this.userService.addPortfolio(
			data.id,
			data.lp_pool_name,
			data.lp_pool_tokens,
		);
	}
}
