import { grant_type } from 'src/request object templates/grandType';
import { routList } from 'src/request object templates/routs';

export default () => ({
  url: process.env.URL_INT,
  refresh_token: process.env.REFRESH_TOKEN,
  access_token: process.env.ACCESS_TOKEN,
  code: process.env.CODE,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: process.env.REDIRECT_URI,
  routs: routList,
  gType: grant_type,
});
