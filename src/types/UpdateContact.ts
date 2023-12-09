import { ContactDTO } from './ContactDTO';
import { RoutList } from './RoutList';

export type UpdateContact = {
  url: string;
  rout: RoutList;
  data: ContactDTO;
  id: number;
};
