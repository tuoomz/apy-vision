import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from 'src/portfolio/models/portfolio.entity';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	) {}

	async all(): Promise<User[]> {
		return await this.userRepository.find({ relations: ['portfolio'] });
	}

	async create(data): Promise<User> {
		return this.userRepository.save(data);
	}

	async findOne(condition): Promise<User> {
		return this.userRepository.findOne(condition);
	}

	async addPortfolio(id, lp_pool_name, lp_pool_tokens): Promise<User> {
		const user = await this.userRepository.findOne(id);
		const portfolio = new Portfolio();
		portfolio.lp_pool_name = lp_pool_name;
		portfolio.lp_pool_tokens = lp_pool_tokens;
		user.portfolio = portfolio;
		return this.userRepository.save(user);
	}
}
