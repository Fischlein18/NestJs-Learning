import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    //   @Get()
    //   getHello(): string {
    //     return this.appService.getHello();
    //   }
    @Get('/:target?')
    getHello(@Param('target') target: string) {
        console.log('say hello to: ', target)
        return this.appService.getHello(target);
    }
}
