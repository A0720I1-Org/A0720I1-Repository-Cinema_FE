import { IProvince } from "./Ward";

export interface IDistrict {
  id:number;
  name:string;
  province:IProvince;
}