import { IProvince } from './IProvince';
export interface IDistrict {
  id:number;
  name:string;
  province:IProvince;
}
