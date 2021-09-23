/* eslint-disable prettier/prettier */
import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	UseInterceptors,
} from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { UserService } from 'src/user/user.service';

@Controller('portfolio')
@UseInterceptors(ClassSerializerInterceptor)
export class PortfolioController {
	constructor(
		private userService: UserService,
		private dataService: DataService,
	) {}

	@Get('leaderboard')
	async getLeaderBoard() {
		const user = await this.userService.all();
		const prices = await this.dataService.getAllPrices()
		let result;
		await Promise.all([user, prices]).then(function (valArray) {
			const priceMap = Object.fromEntries(valArray[1].map(e => [e.name, e.price]))
			
			result = valArray[0].filter(user => user.portfolio != null).map((user) => ({
				...user,
				value:  user.portfolio.lp_pool_tokens * priceMap[user.portfolio.lp_pool_name], // just for example
			  }));
			
		});
		console.log(result);
		result.sort((a, b) => a.value - b.value);
		return result;
	}
}
