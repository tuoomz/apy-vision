import { CACHE_MANAGER, HttpService, Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Repository } from 'typeorm';
import { map } from 'rxjs/operators';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Price } from './models/price.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DataService {
	constructor(
		private readonly httpService: HttpService,
		@Inject(CACHE_MANAGER) protected readonly cacheManager,
		@InjectRepository(Price)
		private readonly priceRepository: Repository<Price>,
	) {}

	async getPrice(name): Promise<Price> {
		return this.priceRepository.findOne(name);
	}

	async getAllPrices(): Promise<Price[]> {
		return this.priceRepository.find();
	}

	async findAll() {
		const value = await this.cacheManager.get('data');
		if (value) {
			return value;
		}

		const data = this.getPoolData();

		return data.pipe(
			map((axiosResponse: AxiosResponse) => {
				//console.log(axiosResponse.data);
				const result = axiosResponse.data.results;
				console.log(result);
				this.cacheManager.set('data', result, { ttl: 3600 });
				return result;
			}),
		);
	}

	async updatePrice() {
		const data = await firstValueFrom(this.getPoolData());
		for (const x of data.data.results) {
			this.priceRepository.save(new Price(x.name, x.avg_lp_price));
		}
	}

	private getPoolData() {
		return this.httpService.get(
			'https://stats.apy.vision/api/v1/pool_search/advanced_search?avg_period_daily_volume_usd=5000000&avg_period_reserve_usd=250000&min_pool_age_days=7&vr=0&exchanges=uniswap_eth&access_token=c1e532d3-c517-4b3c-8cc5-4cb1cd37ba36',
		);
	}

	@Cron(CronExpression.EVERY_5_SECONDS)
	handleCron() {
		this.updatePrice();
	}
}
