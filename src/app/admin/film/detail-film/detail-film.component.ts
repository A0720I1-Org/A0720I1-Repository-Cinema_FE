import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FilmViewDTO} from "../dto/FilmViewDTO";
import {FilmService} from "../../../service/film.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail-film',
  templateUrl: './detail-film.component.html',
  styleUrls: ['./detail-film.component.scss']
})
export class DetailFilmComponent implements OnInit {
  idFilm = 0;
  film = new FilmViewDTO();

  constructor(
    private filmService: FilmService,
    private  activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.idFilm = this.activatedRoute.snapshot.params['id'];
    this.filmService.getFilmById(this.idFilm).subscribe(data => {
      this.film = data;
      if(this.film.age.localeCompare('https://firebasestorage.googleapis.com/v0/b/a0720i1.appspot.com/o/dat-home%2Fc-18.png?alt=media&token=17900829-a490-475b-b8c7-96cd1bbf2c62')){
        this.film.age = '16 tuổi';
      }else {
        this.film.age = '18 tuổi'
      }
      console.log(data)
    });
  }
}
