export class MembershipDTO {
  id: number;
  name: string;
  card: string;
  phone: string;
  wardName: string;
  districtName: string;
  provinceName: string;
  memberCode: string;
  email: string;


  constructor(id: number, name: string, card: string, phone: string, wardName: string, districtName: string, provinceName: string, memberCode: string, email: string) {
    this.id = id;
    this.name = name;
    this.card = card;
    this.phone = phone;
    this.wardName = wardName;
    this.districtName = districtName;
    this.provinceName = provinceName;
    this.memberCode = memberCode;
    this.email = email;
  }
}
