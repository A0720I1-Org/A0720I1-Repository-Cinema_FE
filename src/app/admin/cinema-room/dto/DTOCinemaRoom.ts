export class DTOCinemaRoom {
  id: number;
  name: string;
  seatLayout: string;
  rowSeat: number;
  columnSeat: number;
  status: boolean;


  constructor() {
    this.id = 0;
    this.name = '';
    this.seatLayout = '';
    this.rowSeat = 0;
    this.columnSeat = 0;
    this.status = false;
  }
}
