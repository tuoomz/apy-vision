import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from './models/portfolio.entity';
import { CommonModule } from 'src/common/common.module';
import { DataService } from 'src/data/data.service';
import { DataModule } from 'src/data/data.module';
import { UserModule } from 'src/user/user.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Portfolio]),
		CommonModule,
		DataModule,
		UserModule,
	],
	providers: [PortfolioService],
	controllers: [PortfolioController],
})
export class PortfolioModule {}
