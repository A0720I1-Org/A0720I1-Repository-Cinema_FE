import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/database";
import {Seat} from "../model/book-ticket/Seat";

@Injectable({
  providedIn: 'root'
})
export class KeepingSeatService {
  private dbUrl = '/seats-list'
  keepingSeatListRef: AngularFireList<Seat> = null;
  keepingSeatRef: AngularFireObject<any>

  constructor(
    private db: AngularFireDatabase
  ) {
    this.keepingSeatListRef = this.db.list(this.dbUrl);
  }

  addSeat(seat: Seat){
    this.keepingSeatListRef.push(seat)
  }

  getSeatById(id: number){
    this.keepingSeatRef = this.db.object(this.dbUrl + '/' + id) as AngularFireObject<Seat>;
    return  this.keepingSeatRef
  }

  getKeepingSeatList(){
    return this.keepingSeatListRef;
  }

  removeSeat(id: number){
    this.db.object(this.dbUrl + '/' + id).remove();
  }
}
