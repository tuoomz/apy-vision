import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { UserService } from 'src/user/user.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './models/price.entity';

@Module({
	imports: [
		HttpModule,
		CacheModule.register(),
		ScheduleModule.forRoot(),
		TypeOrmModule.forFeature([Price]),
	],
	providers: [DataService],
	controllers: [DataController],
	exports: [DataService],
})
export class DataModule {}
