import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { DataModule } from './data/data.module';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
	imports: [
		UserModule,
		// TypeOrmModule.forRoot({
		// 	type: 'postgres',
		// 	host: 'db',
		// 	port: 5432,
		// 	username: 'postgres',
		// 	password: 'postgres',
		// 	database: 'postgres',
		// 	autoLoadEntities: true,
		// 	synchronize: true,
		// }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'ec2-52-23-87-65.compute-1.amazonaws.com',
			port: 5432,
			username: 'ifazydgeuihtuz',
			password:
				'c2778f6f22f8767f3c08e2ed77b0d751e49489c95180ea7e489702636afb7d52',
			database: 'd5iis4ttmeu77b',
			autoLoadEntities: true,
			synchronize: true,
			ssl: true,
			extra: {
				ssl: {
					rejectUnauthorized: false,
				},
			},
		}),
		AuthModule,
		CommonModule,
		DataModule,
		PortfolioModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
