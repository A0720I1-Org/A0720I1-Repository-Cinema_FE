import { IDistrict } from "./Province";

export interface IWard {
  id:number;
  name:string;
  district:IDistrict;
}