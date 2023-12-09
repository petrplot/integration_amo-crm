import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { routList } from './request object templates/routs';
import * as env from 'dotenv';
import { grant_type } from './request object templates/grandType';
import { ContactDTO, LeadDTO } from './types';
env.config();

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private url = process.env.URL,
    private refresh_token = process.env.REFRESH_TOKEN,
    private access_token = process.env.ACCESS_TOKEN,
    private code = process.env.CODE,
    private client_id = process.env.CLIENT_ID,
    private client_secret = process.env.CLIENT_SECRET,
    private redirect_uri = process.env.REDIRECT_URI,
    private routs = routList,
    private gType = grant_type,
  ) {}

  @Get('/auth')
  async getAuth() {
    return await this.appService.getTokens({
      url: this.url,
      rout: this.routs,
      client_id: this.client_id,
      client_secret: this.client_secret,
      code: this.code,
      redirect_uri: this.redirect_uri,
      grant_type: this.gType,
    });
  }

  @Get('/acount')
  async getAcount() {
    return await this.appService.getAcount({
      token: this.access_token,
      url: this.url,
      rout: this.routs,
    });
  }

  @Get('/contacts')
  async getContacts() {
    return await this.appService.findContactByParams({
      query: null,
      rout: this.routs,
      url: this.url,
    });
  }

  @Get('/contacts')
  async getContactsByParam(@Query('query') query: string) {
    return await this.appService.findContactByParams({
      query,
      rout: this.routs,
      url: this.url,
    });
  }

  @Post('/contacts')
  async createContact(@Body() dataDto: ContactDTO) {
    return await this.appService.createContact({
      url: this.url,
      rout: this.routs,
      data: dataDto,
    });
  }

  @Put('/contacts/:id')
  async updateContact(@Param('id') id, @Body() dataDto: ContactDTO) {
    return await this.appService.updateContactById({
      url: this.url,
      rout: this.routs,
      data: dataDto,
      id,
    });
  }

  @Post('/leads')
  async createLead(@Body() dataDto: LeadDTO) {
    return await this.appService.createLead({
      url: this.url,
      rout: this.routs,
      data: dataDto,
    });
  }

  @Get('/auth')
  async updateToken() {
    return await this.appService.updateAccessToken({
      url: this.url,
      rout: this.routs,
      refresh_token: this.refresh_token,
      client_id: this.client_id,
      client_secret: this.client_secret,
      redirect_uri: this.redirect_uri,
      grant_type: this.gType,
    });
  }
}
