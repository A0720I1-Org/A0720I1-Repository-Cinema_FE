import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { AccountService } from './../../service/account.service';
import { IDistrict } from './../phat-model/entity/IDistrict';
import { IProvince } from './../phat-model/entity/IProvince';
import { IWard } from './../phat-model/entity/IWard';
import { IAccountMemberDTO } from './../phat-model/dto/IAccountMemberDTO';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidation, ConfirmPasswordValidator, OldNewPassword } from '../validator/confirm-password';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  wards: IWard[];
  provinces: IProvince[];
  districts: IDistrict[];
  wardId:number;
  provinceId:number;
  districtId:number;
  memberAccountDTO :IAccountMemberDTO;
  registerForm : FormGroup;
  genders : String[];
  listError:any ='';
  constructor(
    private router: Router,
    private accountService :AccountService,
    private toastrService:ToastrService,
    private formBuilder: FormBuilder,
    private tokenStorage:TokenStorageService) { }
  ngOnInit(): void {
    this.genders =['Nam','Nữ','Khác']
    this.getProvince();
    this.registerForm = this.formBuilder.group({
      username: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'),
      Validators.minLength(6), Validators.maxLength(45)]],
      password: ['',[Validators.required,
        Validators.minLength(8), Validators.maxLength(45),
        // Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')
      ]],
      confirmPassword: ['',[Validators.required]],
      memberCode:[this.makeMembercode(8)],
      email: ['',[Validators.required,
        Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'),
        Validators.maxLength(253)
      ]],
      name: ['',[Validators.required,
        // Validators.pattern(/^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/),
        Validators.maxLength(45)]],
      birthday: ['',[Validators.required]],
      gender: ['Nam',[Validators.required]],
      card: ['',[Validators.required, Validators.pattern('^[\\d]{9,12}$')]],
      phone: ['',[Validators.required, Validators.pattern('^0[\\d]{9,10}$')]],
      provinceId:[''],
      districtId:[''],
      wardId: ['',[Validators.required]],
      imageURL: [''],
    },
    {
      validators: [ConfirmPasswordValidation]
    });

  }
  getProvince() {
    this.accountService.getAllProvinces().subscribe(
      (data) => {
        this.provinces = data;
      }
    )
  }
  getProvinceId(selectedProvince) {
    this.provinceId = selectedProvince.value;
    this.getDistrict();
  }
  getDistrict() {
     if(!this.provinceId) {
        return;
      }
    this.accountService.getDistrictByProvince(this.provinceId).subscribe(
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
    if(!this.districtId) {
      return;
    }
    this.accountService.getWardByDistrict(this.districtId).subscribe(
      (data) => {
        this.wards = data;
      }
    )
  }
  getWardId(selectedWard) {
    this.wardId= selectedWard.value;
  }
  public makeMembercode(length) {
        let number1 = Math.floor(1000 + Math.random() * 9000);
        let number2= Math.floor(1000 + Math.random() * 9000);
        let number3= Math.floor(1000 + Math.random() * 9000);
        let number4= Math.floor(1000 + Math.random() * 9000);
        return number1+'-'+number2+'-'+number3+'-'+number4;
  }
  onSubmit() {
    if(this.registerForm.valid){
      this.accountService.register(this.registerForm.value).subscribe(
        data => {
        this.router.navigateByUrl('/').then(() =>
        { this.toastrService.success(
            "Bạn đã đăng kí thành công",
            "Cảnh báo",
            {timeOut: 3000, extendedTimeOut: 1500}
          )}
        );
      },
      err => {
        this.toastrService.error('Hãy kiểm tra lại đăng kí', 'Đăng kí thất bại', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing'
        });
        if (err.status === 400) {
          console.log(err.error)
          this.listError = err.error;
        }
      })
    }
  }
  validationMessage = {
    'username': [
      {type: 'required', message: 'Tên đăng nhập không được để trống!'},
      {type: 'minlength', message: 'Tên đăng nhập  phải nhiều hơn 6 kí tự'},
      {type: 'maxlength', message: 'Tên đăng nhập  phải ít hơn 45 kí tự'},
      {type: 'pattern', message: 'Tên đăng nhập  không được chứa kí tự đặc biệt'}
    ],
    'password': [
      {type: 'required', message: 'Mật khẩu không được để trống!'},
      {type: 'minlength', message: 'Mật khẩu phải nhiều hơn 6 kí tự'},
      {type: 'maxlength', message: 'Mật khẩu phải ít hơn 45 kí tự'},
      {type: 'pattern', message: 'Mật khẩu không được chứa kí tự đặc biệt'},
    ],
    'confirmPassword': [
      {type: 'required',message: 'Xác nhận mật khẩu không được để trống'},
      {type: 'failConfirmPassword', message: 'Xác nhận mật khẩu phải  trùng với mật khẩu'},
    ],
    'email': [
      {type: 'required', message: 'Email không được để trống!'},
      {type: 'maxlength', message: 'Mật khẩu phải ít hơn 253 kí tự'},
      {type: 'pattern', message: 'Email phải đúng định dạng'},
    ],
    'name': [
      {type: 'required', message: 'Họ và tên không được để trống!'},
      {type: 'maxlength', message: 'Mật khẩu phải ít hơn 253 kí tự'},
      {type: 'pattern', message: 'Họ và tên phải đúng định dạng'},
    ],
    'birthday': [
      {type: 'required', message: 'Ngày sinh không được để trống!'},
      {type: 'pattern', message: 'Ngày sinh phải đúng định dạng'},
    ],
    'gender': [
      {type: 'required', message: 'Giới tính không được để trống!'},
    ],
    'card': [
      {type: 'required', message: 'Số CMND không được để trống!'},
      {type: 'pattern', message: 'Số CMND phải đúng định dạng'},
    ],
    'phone': [
      {type: 'required', message: 'Số điện thoại không được để trống!'},
      {type: 'pattern', message: 'Số điện thoại phải đúng định dạng'},
    ],
    'wardId': [
      {type: 'required', message: 'Khu vực không được để trống!'},
    ],
  };
}
