import { IMembership } from './../entity/IMembership';
import { IAccount } from './../entity/IAccount';
export interface IJwtResponse{
  token:string;
  type:string;
  account:IAccount;
  membership:IMembership;
  roles:string[];
}
