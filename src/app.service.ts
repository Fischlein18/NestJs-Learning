import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
    getHello(target: string): string {
        if (!target) return 'Hello World!';
        else return `Hello ${target}!`
    }
}

