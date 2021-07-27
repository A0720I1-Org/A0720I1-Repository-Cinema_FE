import { MembershipService } from './../../../service/membership.service';
import { Router } from '@angular/router';
import { IMembershipUpdateDTO } from './../../phat-model/dto/IMembershipUpdateDTO';
import { Component, OnInit } from '@angular/core';
import { IDistrict } from '../../phat-model/entity/IDistrict';
import { IProvince } from '../../phat-model/entity/IProvince';
import { IWard } from '../../phat-model/entity/IWard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/service/account.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { IMembership } from '../../phat-model/entity/IMembership';

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

  constructor(private accountService :AccountService,
    private toastrService:ToastrService,
    private formBuilder: FormBuilder,
    private tokenStorage:TokenStorageService,
    private router: Router,
    private membershipService: MembershipService) { }
  ngOnInit(): void {
    this.membership = this.tokenStorage.getUserSesstion().membership;
    this.genders =['Nam','Nữ','Khác'];
    this.getProvince();
    this.updateForm = this.formBuilder.group({
      id:[this.membership.id],
      email: [this.membership.email,Validators.required],
      name: [this.membership.name,Validators.required],
      birthday: [this.membership.birthday,Validators.required],
      gender: [this.membership.gender,Validators.required],
      card: [this.membership.card,Validators.required],
      phone: [this.membership.phone,Validators.required],
      provinceId:[this.membership.ward.district.province.id],
      districtId:[this.membership.ward.district.id],
      wardId: [this.membership.ward.id,Validators.required],
      imageURL: [this.membership.imageURL],
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
  onSubmit(){
    if(this.updateForm.valid) {
      this.membershipService.update(this.updateForm.value).subscribe(
        data => {
        this.user = this.tokenStorage.getUserSesstion();
        this.user.membership = data ;
        this.tokenStorage.saveUserSession(this.user);
        this.router.navigateByUrl('/').then(() =>
        { this.toastrService.success(
            "Bạn đã cập nhật tài khoản thành công",
            "Cảnh báo",
            {timeOut: 3000, extendedTimeOut: 1500}
          )}
        );
      },
      err => {
        this.toastrService.error('Hãy kiểm tra lại cập nhật', 'Cập nhật thất bạt', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing'
        });
        if (err.status === 400) {
          console.log(err.error)
        }
      })
    }
    }
  }

