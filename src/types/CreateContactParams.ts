import { ContactDTO } from './ContactDTO';
import { RoutList } from './RoutList';

export type CreateContactParams = {
  url: string;
  rout: RoutList;
  data: ContactDTO;
};
