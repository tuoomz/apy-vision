import { IsNotEmpty } from 'class-validator';

export class PortfolioDto {
	@IsNotEmpty()
	id: number;
	@IsNotEmpty()
	lp_pool_name: string;
	@IsNotEmpty()
	lp_pool_tokens: string;
}
