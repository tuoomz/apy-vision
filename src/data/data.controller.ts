import { Controller, Get, Req } from '@nestjs/common';
import { DataService } from './data.service';
@Controller('data')
export class DataController {
	constructor(private dataService: DataService) {}

	@Get('pools')
	async get(): Promise<any> {
		return this.dataService.findAll();
	}
}
