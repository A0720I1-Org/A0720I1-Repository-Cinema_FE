import { IWard } from "./District";
import { IAccount } from "./IAccount";

export interface IEmployee{
    id:number;
    name:string;
    card:boolean;
    phone:string;
    email:string;
    birthday:string;
    gender:string;
    imageURL:string;
    status:boolean;
    ward:IWard;
    account:IAccount;
}