export class Invoice {
  id: number;
  memberId: number;
  memberCode: string;
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  paymentMethod: string;


  constructor() {
    this.id = 0;
    this.memberId = 0;
    this.memberCode = '';
    this.memberName = '';
    this.memberEmail = '';
    this.memberPhone = '';
    this.paymentMethod = '';
  }
}
