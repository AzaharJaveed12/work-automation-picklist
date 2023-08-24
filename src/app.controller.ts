import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/sendxml')
  @Header('Content-Type', 'application/xml')
  sendXML(@Body() body): any {
    //console.log(body);
    return this.appService.sendXML(body);
  }

  @Get('/mappedjsondata')
  getMappedData() {
    return this.appService.getMappedData();
  }
}
