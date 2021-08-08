export class BookingInformation {
  showtimeId: number;
  memberId: number;
  seatIdList: number[];
  paymentMethodId: number;


  constructor(showtimeId: number, memberId: number, seatIdList: number[], paymentMethodId: number) {
    this.showtimeId = showtimeId;
    this.memberId = memberId;
    this.seatIdList = seatIdList;
    this.paymentMethodId = paymentMethodId;
  }
}
