import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieparser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:5173',
        'http://172.16.16.211:5173',
        'http://172.16.16.211:5173/',
      ],
      credentials: true,
    },
  });

  app.use(cookieparser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
