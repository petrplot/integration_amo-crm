import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ContactDTO, GrantType, LeadDTO, RoutList } from './types';
import { ConfigService } from '@nestjs/config';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get('/auth')
  async getAuth() {
    return await this.appService.getTokens({
      url: this.configService.get<string>('url'),
      rout: this.configService.get<RoutList>('routs'),
      client_id: this.configService.get<string>('client_id'),
      client_secret: this.configService.get<string>('client_secret'),
      code: this.configService.get<string>('code'),
      redirect_uri: this.configService.get<string>('redirect_uri'),
      grant_type: this.configService.get<GrantType>('gType'),
    });
  }

  @Get('/acount')
  async getAcount() {
    return await this.appService.getAcount({
      token: this.configService.get<string>('access_token'),
      url: this.configService.get<string>('url'),
      rout: this.configService.get<RoutList>('routs'),
    });
  }

  @Get('/contacts')
  async getContactsByParam(@Query('query') query: string | null = null) {
    return await this.appService.findContactByParams({
      query,
      url: this.configService.get<string>('url'),
      rout: this.configService.get<RoutList>('routs'),
    });
  }

  @Post('/contacts')
  async createContact(@Body() dataDto: ContactDTO) {
    return await this.appService.createContact({
      url: this.configService.get<string>('url'),
      rout: this.configService.get<RoutList>('routs'),
      data: dataDto,
    });
  }

  @Put('/contacts/:id')
  async updateContact(@Param('id') id: number, @Body() dataDto: ContactDTO) {
    return await this.appService.updateContactById({
      url: this.configService.get<string>('url'),
      rout: this.configService.get<RoutList>('routs'),
      data: dataDto,
      id: id,
    });
  }

  @Post('/leads')
  async createLead(@Body() dataDto: LeadDTO) {
    return await this.appService.createLead({
      url: this.configService.get<string>('url'),
      rout: this.configService.get<RoutList>('routs'),
      data: dataDto,
    });
  }

  @Get('/auth')
  async updateToken() {
    return await this.appService.updateAccessToken({
      url: this.configService.get<string>('url'),
      rout: this.configService.get<RoutList>('routs'),
      refresh_token: this.configService.get<string>('refresh_token'),
      client_id: this.configService.get<string>('client_id'),
      client_secret: this.configService.get<string>('client_secret'),
      redirect_uri: this.configService.get<string>('redirect_uri'),
      grant_type: this.configService.get<GrantType>('gType'),
    });
  }
}
