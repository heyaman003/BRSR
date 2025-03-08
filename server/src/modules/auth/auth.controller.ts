import { Body, Controller, Get, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import ResponseModel from 'src/utils/ResponseModel';
import { AuthService } from './auth.service';
import { SiginInDto } from './auth.dtos';
import { Public } from 'src/utils/auth/public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("signin")
    @Public()
    async signin(@Body(ValidationPipe) siginInRequest: SiginInDto, @Res({passthrough: true}) response: Response): Promise<ResponseModel> {
        const userdetails = await this.authService.signIn(siginInRequest.email, siginInRequest.password);

        response.cookie('authorization', `Bearer ${userdetails.accessToken}`, {httpOnly: true, sameSite: "lax", secure: false, maxAge: 60*60000})
        return new ResponseModel(200, 'Successfully signed in.', userdetails.userdetails);
    }

    @Post("logout")
    async logout(@Res({passthrough: true}) response: Response): Promise<ResponseModel> {
        response.cookie('authorization', "", {maxAge: 0});
        return new ResponseModel(200, "Success.");
    }

    @Get("userdetails")
    async getUseretails(@Req() request: Request): Promise<ResponseModel> {
        const user = await this.authService.getUserdetails(request['user']['sub']);
        return new ResponseModel(200, "Success", user)
    }
}
