import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieparser from 'cookie-parser';
import helmet from 'helmet';
import { doubleCsrf } from 'csrf-csrf';

async function bootstrap() {
  const PROFILE= process.env.PROFILE;

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });

  if(PROFILE==='dev')
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
    cookieOptions: PROFILE==='dev' ? {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    } : {
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    },
    cookieName: 'csrf',
  });
  app.use(doubleCsrfProtection);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
