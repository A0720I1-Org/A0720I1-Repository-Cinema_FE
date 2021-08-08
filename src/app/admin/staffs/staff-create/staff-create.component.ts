import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { StaffCreateDto } from '../staffDto/StaffCreateDto';
import { ReactiveFormsModule } from '@angular/forms';
import { IWard } from '../staffDto/District';
import { IProvince } from '../staffDto/Ward';
import { IDistrict } from '../staffDto/Province';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from "rxjs/operators";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
  styleUrls: ['./staff-create.component.scss']
})
export class StaffCreateComponent implements OnInit {

  staffCreateForm: FormGroup;

  wards: IWard[];
  provinces: IProvince[];
  districts: IDistrict[];
  wardId: number;
  provinceId: number;
  districtId: number;

  filePath : string =  null;
  inputImage: any = null;
  staff: StaffCreateDto;
  uploading: boolean;
  // Thieu error message
  defaultImage="https://epicattorneymarketing.com/wp-content/uploads/2016/07/Headshot-Placeholder-1.png";

  listError : any = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private staffService: EmployeeService,
    private toastrService : ToastrService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getProvince();
    this.staffService.getDistrictByProvince(1).subscribe(
      (data) => {
        this.districts = data;
      }
    )
    this.staffService.getWardByDistrict(1).subscribe(
      (data) => {
        this.wards = data;
      }
    )
  }

  getProvince() {
    this.staffService.getAllProvinces().subscribe(
      (data) => {
        this.provinces = data;
        this.getProvinceId;
      }
    )
  }
  getProvinceId(selectedProvince) {
    this.provinceId = selectedProvince.value;
    this.getDistrict();
    this.getDistrictId;
  }
  getDistrict() {
    this.staffService.getDistrictByProvince(this.provinceId).subscribe(
      (data) => {
        this.districts = data;
      }
    )
  }
  getDistrictId(selectedDistrict) {
    this.districtId = selectedDistrict.value;
    this.getWard();
  }
  getWard() {
    if (!this.districtId) {
      this.staffService.getWardByDistrict(1).subscribe(
        (data) => {
          this.wards = data;
        }
      )
    } else {
      this.staffService.getWardByDistrict(this.districtId).subscribe(
        (data) => {
          this.wards = data;
        }
      )
    }
  }
  getWardId(selectedWard) {
    this.wardId = selectedWard.value;
  }

  onSubmit() {
    this.staffService.createStaff(this.staffCreateForm.value).subscribe(data => {
      this.router.navigateByUrl('/admin/staffs')
    });
    if(this.inputImage != null) {
      const imageName = formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US') + this.inputImage.name;
      const fileRef = this.storage.ref(imageName);
      this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
        finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
      
                this.staffService.createStaff({...this.staffCreateForm.value,imageUrl: url}).subscribe(
                  () => {
                    this.router.navigateByUrl("/admin/staffs").then(
                      r => this.toastrService.success(
                        "Tạo mới thành công",
                        "Thông báo",
                        {timeOut: 3000, extendedTimeOut: 1500})
                    )
                  },
                  (error: HttpErrorResponse) => {
                    // console.log(error)
                    // if (error.status == 400) {
                    //   console.log(error.error);
                    //   this.listError = error.error;
                    // }
                      this.toastrService.error(
                        "Tạo mới thất bại",
                        "Thông báo",
                        {timeOut: 3000, extendedTimeOut: 1500})
                    
                });
            })
          })
      ).subscribe()
      }else {
        this.staffService.createStaff(this.staffCreateForm.value).subscribe(
          () => {
            this.router.navigateByUrl("/admin/staffs").then(
              r => this.toastrService.success(
                "Tạo mới thành công",
                "Thông báo",
                {timeOut: 3000, extendedTimeOut: 1500})
            )
          },
          (error: HttpErrorResponse) => {
            console.log(error)
            if (error.status == 400) {
              console.log(error.error);
              this.listError = error.error;
            }
          
          this.toastrService.error(
                "Tạo mới thất bại",
                "Thông báo",
                        )
          });
      }
   
  }

  validationMessage = {
    'username': [
      { type: 'required', message: 'Tên đăng nhập không được để trống!' },
      { type: 'minlength', message: 'Tên đăng nhập tối thiểu 4 ký tự' },
      { type: 'maxlength', message: 'Tên đăng nhập tối đa 32 ký tự' },
      { type: 'pattern', message: 'Tên đăng nhập không chứa dấu ký tự đặc biệt hoặc khoảng trắng' },

    ],
    'password': [
      { type: 'required', message: 'Mật khẩu không được để trống!' },
      { type: 'minlength', message: 'Mật khẩu tối thiểu 4 ký tự' },
      { type: 'maxlength', message: 'Mật khẩu tối đa 32 ký tự' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Xác nhận mật khẩu không được để trống!' },
      { type: 'match', message: 'Xác nhận mật khẩu không trùng khớp' },
      { type: 'failConfirmPassword', message: 'Xác nhận mật khẩu phải trùng với mật khẩu' },
    ],
    'name': [
      { type: 'required', message: 'Họ và tên không được để trống!' },
      { type: 'maxlength', message: 'Họ và tên dài tối đa 300 ký tự' },
      { type: 'pattern', message: 'Họ và tên không chứa ký tự số hoặc ký tự đặc biệt' }
    ],
    'birthday': [
      { type: 'required', message: 'Ngày sinh không được để trống!' },
      { type: 'past', message: 'Ngày sinh phải là ngày trong quá khứ' },
      { type: 'notEnoughAge', message: 'Bạn chưa đủ tuổi để đăng kí' },
      { type: 'tooAge', message: 'Bạn không thể quá 100 tuổi' }
    ],
    'gender': [
      { type: 'required', message: 'Giới tính không được để trống!' }
    ],
    'email': [
      { type: 'required', message: 'Email không được để trống!' },
      { type: 'email', message: 'Email không đúng định dạng' }
    ],
    'imageUrl': [
      { type: 'pattern', message: 'Chỉ chấp nhận file jpg, png, jpeg' }
    ]
  };


  initForm() {
    this.staffCreateForm = this.formBuilder.group({
      username: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
      ]),
      password: (''),
      confirmPassword: [''],
      name: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(300),
        Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/)
      ]),
      birthday: this.formBuilder.control('', [
        Validators.required,
        past
      ]),
      gender: this.formBuilder.control('', [
        Validators.required
      ]),
      wardId: this.formBuilder.control(1),
      districtId: this.formBuilder.control(1),
      provinceId: this.formBuilder.control(1),
      email: this.formBuilder.control('', [
        Validators.email
      ]),
      card: this.formBuilder.control('', [
        Validators.required
      ]),
      phone: this.formBuilder.control('', [
        Validators.required
      ]),
      imageURL: this.formBuilder.control(null, [
        Validators.required
      ]),
    },{validators : [ConfirmPasswordValidation, ValidateAge, ValidateYear]})
  }

  selectImage(event) {
    this.inputImage = event.target.files[0];
    this.staffCreateForm.get('imageURL').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(this.inputImage)
  }
  getImageUrl(){
    if(this.filePath != null){
      return this.filePath;
    }
    if(this.staffCreateForm.value.imageUrl != null){
      return this.staffCreateForm.value.imageUrl;
    }
    return this.defaultImage;
  }
}




function passwordMatched(formControl: AbstractControl) {
  const pw = formControl.value;
  if (pw.password !== pw.confirmPassword) {
    return { match: true };
  }
  return null;
}

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
function ValidateAge(group: FormGroup) {
  let date = group.get('birthday').value;
  let age = getAge(date);
  return age > 15 || age < 0 ? null : { notEnoughAge: true };
}
function past(formControl: AbstractControl) {
  const formValue = formControl.value;
  const dateCurrent = new Date(formValue)
  const today = new Date();
  if (today.getTime() < dateCurrent.getTime()) {
    return { past: true };
  }
  return null;
}
function ValidateYear(group: FormGroup) {
  let date = group.get('birthday').value;
  let age = getAge(date);
  return age < 100 ? null : { tooAge: true };
}
function ConfirmPasswordValidation(group: FormGroup) {
  const password = group.get('password').value;
  const confirmPassword = group.get('confirmPassword').value;
  return password === confirmPassword  ? null : {failConfirmPassword: true};
}
