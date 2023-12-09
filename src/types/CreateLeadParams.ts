import { LeadDTO } from './LeadDTO';
import { RoutList } from './RoutList';

export type CreateLeadParams = {
  url: string;
  rout: RoutList;
  data: LeadDTO;
};
