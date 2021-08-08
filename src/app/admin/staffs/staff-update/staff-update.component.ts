import { ActivatedRoute } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/service/employee.service';
import { IWard } from '../staffDto/District';
import { IDistrict } from '../staffDto/Province';
import { StaffCreateDto } from '../staffDto/StaffCreateDto';
import { IProvince } from '../staffDto/Ward';
import { formatDate } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { IEmployee } from '../staffDto/IEmployee';
import { IStaffDTO } from '../staffDto/ListStaffDto';

@Component({
  selector: 'app-staff-update',
  templateUrl: './staff-update.component.html',
})
export class StaffUpdateComponent implements OnInit {
  staffCreateForm: FormGroup;

  wards: IWard[];
  provinces: IProvince[];
  districts: IDistrict[];
  wardId: number;
  provinceId: number;
  districtId: number;

  filePath : string =  null;
  inputImage: any = null;
  staffUpdate : IEmployee=null;
  employee : IEmployee;
  uploading: boolean;
  id:number;
  // Thieu error message
  defaultImage="https://epicattorneymarketing.com/wp-content/uploads/2016/07/Headshot-Placeholder-1.png";
  employeeService: EmployeeService;

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private staffService: EmployeeService,
    private toastrService : ToastrService,
    private route : ActivatedRoute,
    @Inject(AngularFireStorage) private storage: AngularFireStorage) { }
  ngOnInit(): void {
    this.getProvince() 
    this.getId();
    this.getStaffById(this.id);
  }


  getId() {
    this.id = this.route.snapshot.params['id'];
  }

  getStaffById(id:number) {
    this.staffService.getByEmployeeId(id).subscribe((data)=>{
      this.staffUpdate = data;
      console.log(data);
      this.initForm();
      console.log(this.staffUpdate.imageURL);
      console.log(this.staffUpdate.account.username);
      this.filePath = this.staffUpdate.imageURL;
      this.staffService.getDistrictByProvince(this.staffUpdate.ward.district.province.id).subscribe(
        (data) => {
          this.districts = data;
        }
      )
      this.staffService.getWardByDistrict(this.staffUpdate.ward.district.id).subscribe(
        (data) => {
          this.wards = data;
        }
      )
    });
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

  initForm(){
    this.staffCreateForm = this.formBuilder.group({
      id:this.formBuilder.control(this.staffUpdate.id),
      password:this.formBuilder.control(this.staffUpdate.account.password),
      confirmPassword: this.formBuilder.control(this.staffUpdate.account.password),
      username: this.formBuilder.control(this.staffUpdate.account.username),
      name: this.formBuilder.control(this.staffUpdate.name, [
        Validators.required,
        Validators.maxLength(300),
        Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/)
      ]),
      birthday: this.formBuilder.control(this.staffUpdate.birthday, [
        Validators.required
      ]),
      gender: this.formBuilder.control(this.staffUpdate.gender, [
        Validators.required
      ]),
      wardId: this.formBuilder.control(this.staffUpdate.ward.id),
      districtId: this.formBuilder.control(this.staffUpdate.ward.district.id),
      provinceId: this.formBuilder.control(this.staffUpdate.ward.district.province.id),
      email: this.formBuilder.control(this.staffUpdate.email, [
        Validators.required
      ]),
      card: this.formBuilder.control(this.staffUpdate.card, [
        Validators.required
      ]),
      phone: this.formBuilder.control(this.staffUpdate.phone, [
        Validators.required
      ]),
      imageURL: this.formBuilder.control(this.staffUpdate.imageURL, [
        Validators.required
      ]),
    })
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
    return this.defaultImage;
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
      
                this.staffService.update({...this.staffCreateForm.value,imageUrl: url}).subscribe(
                  () => {
                    this.router.navigateByUrl("/admin/staffs").then(
                      r => this.toastrService.success(
                        "Chỉnh sửa thành công",
                        "Thông báo",
                        {timeOut: 3000, extendedTimeOut: 1500})
                    )
                  },
                  (error: HttpErrorResponse) => {
                    this.router.navigateByUrl("/admin/staffs").then(
                      r => this.toastrService.error(
                        "Chỉnh sửa thất bại",
                        "Thông báo",
                        {timeOut: 3000, extendedTimeOut: 1500})
                    )
                });
            })
          })
      ).subscribe()
      }else {
        this.staffService.update(this.staffCreateForm.value).subscribe(
          () => {
            this.router.navigateByUrl("/admin/staffs").then(
              r => this.toastrService.success(
                "Chỉnh sửa thành công",
                "Thông báo",
                {timeOut: 3000, extendedTimeOut: 1500})
            )
          },
          (error: HttpErrorResponse) => {
            this.router.navigateByUrl("/admin/staffs").then(
              r => this.toastrService.error(
                "Chỉnh sửa thất bại",
                "Thông báo",
                {timeOut: 3000, extendedTimeOut: 1500})
            )
          });
      }
   
  }

}
