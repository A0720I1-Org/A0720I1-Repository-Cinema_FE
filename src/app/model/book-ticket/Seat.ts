export class Seat {
  id!: number;
  name!: string;
  seatType!: string;
  seatCode!: string;
  priceId!: number;
  price!: number;
  ticketId!: number;


  constructor() {
    this.id = 0;
    this.name = '';
    this.seatType = '';
    this.seatCode = '';
    this.priceId = 0;
    this.price = 0;
    this.ticketId = 0;
  }
}
