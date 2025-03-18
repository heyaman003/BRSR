import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieparser from 'cookie-parser';
import helmet from 'helmet';
import { doubleCsrf } from 'csrf-csrf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://172.16.16.68:5173'],
    credentials: true,
    exposedHeaders: ['X-Csrf-Token', 'Content-Type'],
    allowedHeaders: ['X-Csrf-Token', 'Content-Type'],
  });

  app.use(cookieparser());
  app.use(helmet());

  const { doubleCsrfProtection } = doubleCsrf({
    getSecret: () => 'hello world',
    ignoredMethods: ['HEAD'],
    cookieOptions: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    },
    cookieName: 'csrf',
  });
  app.use(doubleCsrfProtection);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
