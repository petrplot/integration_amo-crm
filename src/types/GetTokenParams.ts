import { GrantType } from './GrantType';
import { RoutList } from './RoutList';

export type GetTokenParams = {
  url: string;
  rout: RoutList;
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri: string;
  grant_type: GrantType;
};
