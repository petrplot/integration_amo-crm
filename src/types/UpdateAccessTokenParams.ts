import { GrantType } from './GrantType';
import { RoutList } from './RoutList';

export type UpdateAccessTokenParams = {
  url: string;
  rout: RoutList;
  refresh_token: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  grant_type: GrantType;
};
