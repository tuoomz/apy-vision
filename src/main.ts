import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe());
	app.useStaticAssets(join(__dirname, '..', 'public'));
	app.setBaseViewsDir(join(__dirname, '..', 'views'));
	app.setViewEngine('hbs');
	app.use(cookieParser());
	app.enableCors({
		origin: 'https://secure-beach-69653.herokuapp.com',
		credentials: true,
	});
	await app.listen(process.env.PORT || 3000);
}
bootstrap();
