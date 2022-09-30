import { IRole } from './master-entities';

export interface ILoggedInUser {

    TockenId: any;
    Name: string;
    Roles: IRole[]; 
  }

