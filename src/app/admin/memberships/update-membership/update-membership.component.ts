import { Component, OnInit } from '@angular/core';
import {MembershipService} from "../../../service/membership.service";
import {FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-membership',
  templateUrl: './update-membership.component.html',
  styleUrls: ['./update-membership.component.scss']
})
export class UpdateMembershipComponent implements OnInit {
  id: number;
  formTeacher: FormGroup;
  constructor(private membershipService: MembershipService,
              private  activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.initFormUpdate();
    this.membershipService.getMembershipById(this.id).subscribe(data => {
      this.teacher = data;
      // @ts-ignore
      this.studentClass = data.studentClass;
      this.formTeacher.patchValue(data);
    });
  }

}
