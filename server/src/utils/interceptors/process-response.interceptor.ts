import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { map, Observable } from "rxjs";
import ResponseModel from "src/utils/ResponseModel";

export class ProcessResponseInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data:any)=>{
                if(data instanceof ResponseModel){
                    // Deleting empty data field
                    if(!data.data)
                        delete data.data

                    // Setting the statuscode of the response
                    const response: Response = context.switchToHttp().getResponse();
                    response.statusCode = data.statusCode;

                    return data;
                }
                else return data
            })
        )
    }
    
}