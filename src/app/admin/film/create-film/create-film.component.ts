import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FilmCreateDTO} from "../dto/FilmCreateDTO";
import {FilmCreateError} from "../dto/FilmCreateError";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FilmService} from "../../../service/film.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-create-film',
  templateUrl: './create-film.component.html',
  styleUrls: ['./create-film.component.scss']
})
export class CreateFilmComponent implements OnInit {

  filmForm: FormGroup;
  validationMessage = {
    'name': [
      {type: 'required', message: 'Tên phim không được để trống!'},
      {type: 'maxlength', message: 'Tên phim tối đa 300 ký tự'},
      {type: 'pattern', message: 'Tên phim không chứa dấu ký tự đặc biệt'},
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
    'duration': [
      {type: 'required', message: 'Thời lượng không được để trống!'}
    ],
    'trailers': [
      {type: 'required', message: 'Trailer không được để trống!'}
    ],
    'category': [
      {type: 'required', message: 'Thể loại không được để trống!'},
    ],
    'description': [
      {type: 'required', message: 'Nội dung không được để trống!'},
    ],
    'age': [
      {type: 'required', message: 'Tuổi giới hạn không được để trống!'}
    ],
  };
  inputImage: any = null;
  film: FilmCreateDTO;
  uploading: boolean;
  // @ts-ignore
  errorMessage = new FilmCreateError();
  filePath: string=null;
  categories: string[] = [];
  checkedItems = [];
  checkString: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private filmService: FilmService,
    private toastrService: ToastrService,
    @Inject(AngularFireStorage)
    private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.categories=["Hành động", "Hài hước", "Lạng mạn", "Tình cảm", "Viễn tưởng", "Chiến tranh", "Kiếm hiệp", "Âm nhạc", "Hoạt hình", "Kinh dị", "Phiêu lưu", "Võ thuật", "Kinh điển", "Tâm lý"];
    this.initForm();
    this.uploading = false;
  }

  initForm() {
    this.filmForm = this.formBuilder.group({
      name: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(300),
        Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:]*$/)
      ]),
      imageURL: this.formBuilder.control('',[
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
      duration: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(300),
      ]),
      trailers: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(300),
      ]),
      category: this.formBuilder.control('', [
        // Validators.required,
      ]),
      description: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(300),
      ]),
      age: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(300),
      ]),
    },{
      validators : [ValidateDate]
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
    this.filmForm.value.imageURL = this.inputImage;
  }

  onSubmit() {
    if (this.inputImage != null) {
      this.uploading = true;
      const imageName = formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US') + this.inputImage.name;
      const fileRef = this.storage.ref(imageName);
      this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.filmService.createFilm({...this.filmForm.value,imageURL : url, category: this.checkString}).subscribe(
              (data) => {
                this.router.navigateByUrl("/admin/film/list").then(
                  r => this.toastrService.success(
                    "Thêm mới thành công phim",
                    "Thông báo",
                    {timeOut: 3000, extendedTimeOut: 1500})
                )
              },
              err => {
                this.errorMessage = err.error.errors;
                this.toastrService.error(
                  "Không thể tạo phim",
                  "Có lỗi xảy ra",
                  {timeOut: 3000, extendedTimeOut: 1500}
                )
              }
            );
            this.uploading = false;
          })
        })
      ).subscribe()
      } else {
        this.filmService.createFilm(this.filmForm.value).subscribe(
          (data) => {
            this.router.navigateByUrl("/admin/film/list").then(
            r => this.toastrService.success(
              "Thêm mới thành công phim",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500}))
          },
          err => {
            this.errorMessage = err.error.errors;
            this.toastrService.error(
              "Không thể tạo phim",
              "Có lỗi xảy ra",
              {timeOut: 3000, extendedTimeOut: 1500}
            )
          }
        )
    }
  }

  getImageUrl() {
    if (this.filePath != null) {
      return this.filePath;
    }
    // return 'https://firebasestorage.googleapis.com/v0/b/a0720i1.appspot.com/o/card-image%2Fcard-image.jpg?alt=media&token=d5f7d82f-93bd-425f-ad97-3824621d84df';
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHbCglUlOWGjDMfifMUFHX-yRxt17LD3xZ5A&usqp=CAU';
  }

  changeSelection(item: string) {
    if (this.checkedItems.indexOf(item) == -1) {
      this.checkedItems.push(item)
    } else {
      this.checkedItems.splice(this.checkedItems.indexOf(item), 1)
    }
    this.checkString = this.checkedItems.join(" - ");
    this.filmForm.value.category = this.checkString;
  }
}

function future(formControl: AbstractControl) {
  const formValue = formControl.value;
  const start_date = new Date(formValue)
  const today = new Date();
  if (today.getTime() > start_date.getTime()) {
    return {future: true};
  }
  return null;
}

function ValidateDate(group: FormGroup) {
  const start_date = new Date(group.get('startDate').value);
  const end_date =new Date(group.get('endDate').value);
  if (start_date.getTime() > end_date.getTime()) {
    return {current: true};
  }
  return null;
}

