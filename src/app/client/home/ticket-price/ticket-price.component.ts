import {Component, OnInit} from '@angular/core';
import {TicketService} from "../../../service/ticket.service";
import {FilmService} from "../../../service/film.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ITicketPriceDTO} from "../../../dto/ITicketPriceDTO";
import {IFilmTopDTO} from "../../../dto/IFilmTopDTO";
import {ViewTrailerComponent} from "../view-trailer/view-trailer.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-ticket-price',
  templateUrl: './ticket-price.component.html',
  styleUrls: ['./ticket-price.component.scss']
})
export class TicketPriceComponent implements OnInit {
  ticket: ITicketPriceDTO[];
  listTopFilm: IFilmTopDTO[] = [];

  constructor(
    private filmService: FilmService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getTopFilm();
    this.filmService.getListTicketPrice().subscribe((data) => {
      this.ticket = data;
    }, (error: HttpErrorResponse) => {
      console.log(error.message)
    })
  }

  getTopFilm() {
    this.filmService.getTopFilm().subscribe(
      (data) => {
        this.listTopFilm = data;
      }, (error: HttpErrorResponse) => {
        console.log(error.message)
      })
  }
  viewTrailer(trailer: string) {
    this.dialog.open(ViewTrailerComponent, {
      width: 'auto',
      data: {trailer: trailer + '?autoplay=1'}
    });
  }
}
