import { IAccount } from './IAccount';
import { IWard } from './IWard';
export interface IMembership {
  id:number;
  memberCode:string;
  name:string;
  card:boolean;
  phone:string;
  email:string;
  birthday:string;
  gender:string;
  imageURL:string;
  ward:IWard;
  account:IAccount;
}
