import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-view-trailer',
  templateUrl: './view-trailer.component.html',
  styleUrls: ['./view-trailer.component.scss']
})
export class ViewTrailerComponent implements OnInit {
  trailer: string = '';

  constructor(
    public dialogRef: MatDialogRef<ViewTrailerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.trailer = data.trailer.toString();
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
