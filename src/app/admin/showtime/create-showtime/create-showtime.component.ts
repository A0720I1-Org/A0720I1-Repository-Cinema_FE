import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShowtimeModule} from "../showtime.module";
import {ShowtimeService} from "../../../service/showtime.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-showtime',
  templateUrl: './create-showtime.component.html',
  styleUrls: ['./create-showtime.component.scss']
})
export class CreateShowtimeComponent implements OnInit {
  createForm: FormGroup;
  films: any;
  cinemaRooms: any;


  constructor(private showtimeService: ShowtimeService,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {

  }

  initForm() {
    this.createForm = new FormGroup({
      nameFilm: new FormControl("", [Validators.required]),
      day: new FormControl("", [Validators.required]),
      cinemaRoom: new FormControl("", [Validators.required]),
      filmTechnology: new FormControl("", [Validators.required]),
      time: new FormControl("", [Validators.required]),
      subTitle: new FormControl("", [Validators.required]),
    })
  }

  onSubmit() {
    if (this.createForm.valid) {
      this.showtimeService.createShowtime(this.createForm.value).subscribe(data => {

      })
    }
  }

  getListFilm() {
    this.showtimeService.getListFilm().subscribe(data => {
      this.films = data
    })
  }

  getListCinemaRoom() {
    this.showtimeService.getListCinemaRoom().subscribe(data => {
      this.cinemaRooms = data
    })
  }
}
