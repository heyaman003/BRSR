<<<<<<< HEAD
import { Controller, Get, Head, Options, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './utils/auth/public.decorator';
import { doubleCsrf } from 'csrf-csrf';
import { Response } from 'express';

@Controller()
export class AppController {
  generateCsrfToken: Function;
  constructor(private readonly appService: AppService) {
    const {generateToken} = doubleCsrf({
      getSecret: () => 'hello world',
      ignoredMethods: []
    })

    this.generateCsrfToken = generateToken;
  }

  @Post()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Head('/csrf')
  @Public()
  generateToken(@Req() request: any, @Res() response: Response) : void {
    const token =  request.csrfToken();
    response.set('X-Csrf-Token', token);
    response.send();
  }
=======
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
>>>>>>> 969c5c9 (backend changes)
}
