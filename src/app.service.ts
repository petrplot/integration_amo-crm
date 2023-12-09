import { Injectable } from '@nestjs/common';
import { CreateContactParams, CreateLeadParams, GetTokenParams } from './types';
import { UpdateAccessTokenParams } from './types';
import { UpdateContact } from './types';
import { FindContactByParams } from './types';
import { GetAcountParams } from './types';

@Injectable()
export class AppService {
  createLead = async (params: CreateLeadParams): Promise<Response> => {
    try {
      const { url, rout, data } = params;

      const dataDto = {
        name: data.name,
        price: data.price,
        _embedded: {
          contacts: [
            {
              id: data.id,
            },
          ],
        },
      };
      const res = await fetch(url + rout.leads, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataDto),
      });
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  updateAccessToken = async (
    params: UpdateAccessTokenParams,
  ): Promise<Response> => {
    try {
      const {
        url,
        rout,
        refresh_token,
        client_id,
        client_secret,
        redirect_uri,
        grant_type,
      } = params;
      const data = {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: grant_type.refresh,
        refresh_token: refresh_token,
        redirect_uri: redirect_uri,
      };
      const res = await fetch(url + rout.auth, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  createContact = async (params: CreateContactParams): Promise<Response> => {
    try {
      const { url, rout, data } = params;

      //придумать что-нибудь нормальное
      const dataDto = {
        name: data.name,
        custom_fields_values: [
          {
            field_id: 1,
            values: [{ value: { phone: data.phone } }],
          },
          {
            field_id: 2,
            values: [{ value: { email: data.email } }],
          },
        ],
      };

      const res = await fetch(url + rout.contacts, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataDto),
      });
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  updateContactById = async (params: UpdateContact): Promise<Response> => {
    try {
      const { url, rout, data, id } = params;
      const dataDto = {
        name: data.name,
        custom_fields_values: [
          {
            field_id: 1,
            values: [{ value: { phone: data.phone } }],
          },
          {
            field_id: 2,
            values: [{ value: { email: data.email } }],
          },
        ],
      };

      const res = await fetch(url + rout.contacts + '/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataDto),
      });
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  findContactByParams = async (
    params: FindContactByParams,
  ): Promise<Response> => {
    try {
      const { query, url, rout } = params;
      let res: Response;
      if (query) {
        return (res = await fetch(url + rout.contacts + '/?query=' + query));
      } else {
        return (res = await fetch(url + rout.contacts));
      }
    } catch (e) {
      console.log(e);
    }
  };

  getAcount = async (params: GetAcountParams): Promise<Response> => {
    const { token, url, rout } = params;
    const res = await fetch(url + rout.acount, {
      method: 'GET',
      headers: {
        //после Bearer пробел обязательно
        Authorization: 'Bearer ' + token,
      },
    });
    return res;
  };

  getTokens = async (params: GetTokenParams): Promise<Response> => {
    try {
      const {
        url,
        rout,
        client_id,
        client_secret,
        code,
        redirect_uri,
        grant_type,
      } = params;
      const data = {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: grant_type.auth,
        code: code,
        redirect_uri: redirect_uri,
      };
      const res = await fetch(url + rout.auth, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return res;
    } catch (e) {
      console.log(e);
    }
  };
}
