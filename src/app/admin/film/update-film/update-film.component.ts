import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FilmUpdateDTO} from "../dto/FilmUpdateDTO";
import {FilmService} from "../../../service/film.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AngularFireStorage} from "@angular/fire/storage";
import {HttpErrorResponse} from "@angular/common/http";
import {finalize} from "rxjs/operators";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-update-film',
  templateUrl: './update-film.component.html',
  styleUrls: ['./update-film.component.scss']
})
export class UpdateFilmComponent implements OnInit {

  idFilm = 0;
  film: FilmUpdateDTO;
  inputImage: any = null;
  private filePath: string;
  filmForm: FormGroup;
  checkedItems = [];
  checkCategory: string[] = [];
  checkString: string = "";
  categories = ["Hành động", "Hài hước", "Lạng mạn", "Tình cảm", "Viễn tưởng", "Chiến tranh", "Kiếm hiệp", "Âm nhạc", "Hoạt hình", "Kinh dị", "Phiêu lưu", "Võ thuật", "Kinh điển", "Tâm lý"];
  validationMessage = {
    'name': [
      {type: 'required', message: 'Tên phim không được để trống!'},
      {type: 'maxlength', message: 'Tên phim tối đa 300 ký tự'},
      {type: 'pattern', message: 'Tên phim không chứa dấu ký tự đặc biệt hoặc khoảng trắng'},
    ],
    'imageURL': [
      {type: 'required', message: 'Poster không được để trống!'},
      {type: 'pattern', message: 'Chỉ chấp nhận file jpg, png, jpeg'}
    ],
    'startDate': [
      {type: 'required', message: 'Ngày khởi chiếu không được để trống!'},
      {type: 'future', message: 'Ngày khởi chiếu phải là ngày trong tương lai'}
    ],
    'endDate': [
      {type: 'required', message: 'Ngày kết thúc không được để trống!'},
      {type: 'current', message: 'Ngày kết thúc phải sau ngày khởi chiếu'}
    ],
    'actors': [
      {type: 'required', message: 'Diễn viên không được để trống!'},
      {type: 'maxlength', message: 'Diễn viên tối đa 300 ký tự'},
    ],
    'studio': [
      {type: 'required', message: 'Hãng phim không được để trống!'},
      {type: 'maxlength', message: 'Hãng phim tối đa 300 ký tự'},
    ],
    'directors': [
      {type: 'required', message: 'Đạo diễn không được để trống!'},
      {type: 'maxlength', message: 'Đạo diễn tối đa 300 ký tự'},
    ],
    'durations': [
      {type: 'required', message: 'Thời lượng không được để trống!'}
    ],
    'trailers': [
      {type: 'required', message: 'Trailer không được để trống!'}
    ],
    'category': [
      {type: 'required', message: 'Thể loại không được để trống!'},
    ],
    'descriptions': [
      {type: 'required', message: 'Nội dung không được để trống!'},
    ],
    'age': [
      {type: 'required', message: 'Tuổi giới hạn không được để trống!'}
    ],
  };

  constructor(
    private filmService: FilmService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.initFormUpdate();
    this.getFilmId();
  }

  getFilmId() {
    this.idFilm = this.activatedRoute.snapshot.params['id'];
    this.filmService.getFilmById(this.idFilm).subscribe(data => {
      this.film = data;
      this.filePath = this.film.imageURL;
      this.film.imageURL = null;
      this.filmForm.patchValue(this.film);
      this.film = data;
      this.checkCategory = this.film.category.split(" - ");
      this.checkedItems = this.checkCategory;
      this.checkString = this.film.category;
    });
  }

  initFormUpdate() {
    this.filmForm = this.formBuilder.group({
      id: [''],
      name: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(300),
        Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/)
      ]),
      imageURL: this.formBuilder.control('', [
        Validators.required
      ]),
      startDate: this.formBuilder.control('', [
        Validators.required,
        future
      ]),
      endDate: this.formBuilder.control('', [
        Validators.required
      ]),
      actors: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(300),
      ]),
      studio: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(300),
      ]),
      directors: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(300),
      ]),
      durations: this.formBuilder.control('', [
        Validators.required,
      ]),
      trailers: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(300),
      ]),
      category: this.formBuilder.control('', []),
      descriptions: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(300),
      ]),
      age: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(300),
      ]),
    }, {
      validators: [ValidateDate]
    })
  }

  selectImage(event: any) {
    this.inputImage = event.target.files[0];
    this.filmForm.get('imageURL').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(this.inputImage);
  }

  getImageUrl() {
    if (this.filePath != null) {
      return this.filePath;
    }
    // return 'https://firebasestorage.googleapis.com/v0/b/a0720i1.appspot.com/o/card-image%2Fcard-image.jpg?alt=media&token=d5f7d82f-93bd-425f-ad97-3824621d84df';
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHbCglUlOWGjDMfifMUFHX-yRxt17LD3xZ5A&usqp=CAU';
  }

  updateFilm() {
    if (this.inputImage != null) {
      const imageName = formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US') + this.inputImage.name;
      const fileRef = this.storage.ref(imageName);
      this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            // this.filmForm.patchValue({...this.film, imageURL: url, category: this.checkString});
            let film = new FilmUpdateDTO(this.filmForm.get('id').value, this.filmForm.get('name').value, url,
              this.filmForm.get('startDate').value, this.filmForm.get('endDate').value, this.filmForm.get('actors').value, this.filmForm.get('studio').value,
              this.filmForm.get('durations').value, this.filmForm.get('directors').value, this.filmForm.get('trailers').value, this.checkString,
              this.filmForm.get('descriptions').value, this.filmForm.get('age').value)
            this.filmService.updateFilm(film).subscribe(
              () => {
                this.router.navigateByUrl('/admin/film/list').then(
                  r => this.toastrService.success(
                    "Cập nhật thông tin thành công",
                    "Thông báo",
                    {timeOut: 3000, extendedTimeOut: 1500})
                )
              },
              (error: HttpErrorResponse) => {
                console.log(error.message);
              });
          })
        })
      ).subscribe()
    } else {
      let film = new FilmUpdateDTO(this.filmForm.get('id').value, this.filmForm.get('name').value, this.filePath,
        this.filmForm.get('startDate').value, this.filmForm.get('endDate').value, this.filmForm.get('actors').value, this.filmForm.get('studio').value,
        this.filmForm.get('durations').value, this.filmForm.get('directors').value, this.filmForm.get('trailers').value, this.checkString,
        this.filmForm.get('descriptions').value, this.filmForm.get('age').value);
      this.filmService.updateFilm(film).subscribe(
        () => {
          this.router.navigateByUrl('/admin/film/list').then(
            r => this.toastrService.success(
              "Cập nhật thông tin thành công",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500})
          )
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
    }
  }

  checkContain(item: string) {
    if (this.film != null) {
      return this.film.category.includes(item);
    }
    return false;
  }

  changeSelection(item: string) {
    if (this.checkedItems.indexOf(item) == -1) {
      this.checkedItems.push(item)
    } else {
      this.checkedItems.splice(this.checkedItems.indexOf(item), 1)
    }
    this.checkString = this.checkedItems.join(' - ');
    this.filmForm.value.category = this.checkString;
  }
}

function future(formControl: AbstractControl) {
  const formValue = formControl.value;
  const start_date = new Date(formValue);
  const today = new Date();
  if (today.getTime() > start_date.getTime()) {
    return {future: true};
  }
  return null;
}

function ValidateDate(group: FormGroup) {
  const start_date = new Date(group.get('startDate').value);
  const end_date = new Date(group.get('endDate').value);
  if (start_date.getTime() > end_date.getTime()) {
    return {current: true};
  }
  return null;
}

