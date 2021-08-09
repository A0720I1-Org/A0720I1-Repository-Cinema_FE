import { ShowtimeService } from './../../../service/showtime.service';
import { MembershipService } from './../../../service/membership.service';
import { Router } from '@angular/router';
import { IMembershipUpdateDTO } from './../../phat-model/dto/IMembershipUpdateDTO';
import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IDistrict } from '../../phat-model/entity/IDistrict';
import { IProvince } from '../../phat-model/entity/IProvince';
import { IWard } from '../../phat-model/entity/IWard';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/service/account.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { IMembership } from '../../phat-model/entity/IMembership';
import { formatDate } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['../member.component.scss','./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {
  wards: IWard[];
  provinces: IProvince[];
  districts: IDistrict[];
  wardId:number;
  provinceId:number;
  districtId:number;
  membershipUpdate :IMembershipUpdateDTO;
  updateForm : FormGroup;
  genders : String[];
  membership : IMembership;
  user:any='';
  filePath : string =  null;
  inputImage: any = null;
  defaultImage:string="data:image/jpeg;base64,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";
  listError:any='';
  @ViewChild('loading', { static: true }) loading: TemplateRef<any>;
  constructor(private accountService :AccountService,
    private toastrService:ToastrService,
    private formBuilder: FormBuilder,
    private tokenStorage:TokenStorageService,
    private router: Router,
    private membershipService: MembershipService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage,
    private dialog: MatDialog,
    private el: ElementRef,
    private showtime:ShowtimeService
    ) { }
  ngOnInit(): void {
    this.membership = this.tokenStorage.getUserSesstion().membership;
    this.genders =['Nam','Nữ','Khác'];
    this.getProvince();
    this.updateForm = this.formBuilder.group({
      id:[this.membership.id],
      email: [this.membership.email,Validators.required],
      name: [this.membership.name,
        [Validators.required,
        Validators.pattern(/^(\s*)([\p{Lu}]|[\p{Ll}]){2,}((\s*)(([\p{Lu}]|[\p{Ll}]){2,}))+(\s*)$/u),
        Validators.maxLength(45)]],
      birthday: [this.membership.birthday,[Validators.required,past]],
      gender: [this.membership.gender || 'Nam',Validators.required],
      card: [this.membership.card,[Validators.required, Validators.pattern('^[\\d]{9,12}$')]],
      phone: [this.membership.phone,[Validators.required, Validators.pattern(/^(0[3|5|7|8|9])+([0-9]{8})\b$/)]],
      provinceId:[this.membership.ward.district.province.id],
      districtId:[this.membership.ward.district.id],
      wardId: [this.membership.ward.id,Validators.required],
      imageURL: [this.membership.imageURL],
    },{
      validators: [ValidateAge,ValidateYear]
    });
    this.accountService.getDistrictByProvince(this.membership.ward.district.province.id).subscribe(
      (data) => {
        this.districts = data;
      }
    )
    this.accountService.getWardByDistrict(this.membership.ward.district.id).subscribe(
      (data) => {
        this.wards = data;
      }
    )
  }
  selectImage(event) {
    this.inputImage = event.target.files[0];
    this.updateForm.get('imageURL').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(this.inputImage)
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
  getMembershipById(id:number) {
    return this.membershipService.getById(id);
  }
  onSubmit(){
    if(this.updateForm.invalid) {
      for (const key of Object.keys(this.updateForm.controls)) {
        if (this.updateForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          this.updateForm.get(key).markAsTouched();
          invalidControl.focus();
          break;
       }
     }
    }
    else{
      if(this.inputImage != null) {
        this.dialog.open(this.loading,{
          width: '150px',
          height:'125px',
        });
        const imageName = formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US') + this.inputImage.name;
        const fileRef = this.storage.ref(imageName);
        this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
          finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                  this.membershipService.update({...this.updateForm.value,imageURL: url}).subscribe(
                    (data) => {
                      this.dialog.closeAll();
                      this.membershipService.getById(data).subscribe(
                        data => {
                         this.user = this.tokenStorage.getUserSesstion();
                         this.user.membership = data ;
                         this.tokenStorage.saveUserSession(this.user);
                        }
                      )
                      this.router.navigateByUrl("/").then(
                        r => this.toastrService.success(
                          "Cập nhật thành công",
                          "Thông báo",
                          {timeOut: 3000, extendedTimeOut: 1500})
                      )
                    },
                    (err) => {
                      this.dialog.closeAll();
                      this.toastrService.error('Hãy kiểm tra lại cập nhật', 'Cập nhật thất bại', {
                        timeOut: 2000,
                        progressBar: true,
                        progressAnimation: 'increasing'
                      });
                      if (err.status == 400) {
                        this.listError = err.error;
                      }
                    });
              })
            })
        ).subscribe()
      }else{
        this.membershipService.update(this.updateForm.value).subscribe(
          data => {
           this.membershipService.getById(data).subscribe(
             data => {
              this.user = this.tokenStorage.getUserSesstion();
              this.user.membership = data ;
              this.tokenStorage.saveUserSession(this.user);
             }
           )
          this.user = this.tokenStorage.getUserSesstion();
          this.user.membership = data ;
          this.tokenStorage.saveUserSession(this.user);
          this.router.navigateByUrl('/').then(() =>
          { this.toastrService.success(
              "Bạn đã cập nhật tài khoản thành công",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500}
            )}
          );
        },
        (err) => {
          console.log(err.error);
          this.toastrService.error('Cập nhật tài khoản thất bại', 'Thông báo', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing'
          });
          if (err.status == 400) {
            this.listError = err.error;
          }
        })
      }
    }
    }
    getImageUrl(){
      if(this.filePath != null){
        return this.filePath;
      }
      if(this.membership.imageURL != null){

        return this.updateForm.value.imageURL;
      }
      return this.defaultImage;
    }
    validationMessage = {

      'name': [
        {type: 'required', message: 'Họ và tên không được để trống!'},
        {type: 'maxlength', message: 'Họ và tên phải ít hơn 45 kí tự!'},
        {type: 'pattern', message: 'Họ và tên phải có ít nhất 2 từ!'},
      ],
      'birthday': [
        {type: 'required', message: 'Ngày sinh không được để trống!'},
        {type: 'pattern', message: 'Ngày sinh phải đúng định dạng!'},
        {type: 'notEnoughAge', message: 'Bạn phải đủ 15 tuổi!'},
        {type: 'past', message: 'Ngày sinh phải là ngày trong quá khứ!'},
        {type: 'tooAge', message: 'Bạn không thể quá 100 tuổi!'}
      ],
      'gender': [
        {type: 'required', message: 'Giới tính không được để trống!'},
      ],
      'card': [
        {type: 'required', message: 'Số CMND không được để trống!'},
        {type: 'pattern', message: 'Số CMND chỉ được tử 9-12 chữ số!'},
      ],
      'phone': [
        {type: 'required', message: 'Số điện thoại không được để trống!'},
        {type: 'pattern', message: 'Số điện thoại phải đúng định dạng : 09xxabcxyz!'},
      ],
      'wardId': [
        {type: 'required', message: 'Khu vực không được để trống!'},
        {type: 'pattern', message: 'Khu vực không được để trống!'},
      ],
      'confirm': [
        {type: 'requiredTrue', message: 'Bạn phải chấp nhận điều khoản để hoàn thành việc đăng kí!'},
      ],
    };
  }

  function getAge(dateString)
  {
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
  return age > 14  || age < 0 ? null : {notEnoughAge: true};
}
function past(formControl: AbstractControl) {
  const formValue = formControl.value;
  const dateCurrent = new Date(formValue)
  const today = new Date();
  if (today.getTime() < dateCurrent.getTime()) {
    return {past: true};
  }
  return null;
}
function ValidateYear(group: FormGroup) {
  let date = group.get('birthday').value;
  let age = getAge(date);
  return age < 100 ? null : {tooAge: true};
}
