import { UserService } from './../../services/user.services';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  HttpEventType,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
  HttpClient
} from '@angular/common/http';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'environments/environment';

export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'user-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;
  @Input() user: any
  filePath!: string;
  

  imagePath: any;
  imgURL: any;

  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };
  private domain = environment.API_URL;

  constructor(private userService: UserService,
    private http: HttpClient) {}

  ngOnInit(
    
  ): void{
    

  }
  isSave = false;
  onSave() {
    // this.isSave = !this.isSave;
    this.uploadFile();
    window.location.reload();
  }

  onCancle() {}

  onClick() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0,
      };
      this.fileUpload.nativeElement.value = '';
      this.isSave = !this.isSave;
      // this.isSave = !this.isSave;
      // this.user.avatarUrl = this.file.data.fil
      // console.log(this.file.data);

      // var reader = new FileReader();
      // this.imagePath = this.file.data;
      // reader.readAsDataURL(this.file.data); 
      // reader.onload = (_event) => { 
      //   this.imgURL = reader.result; 
      // }
      // console.log(this.imgURL);

      // this.uploadFile();
    };
  }

  async uploadFile() {
    const formData = new FormData();
    // console.log('file:', this.file.data);
    

    await formData.append('image', this.file.data);


    this.userService.updateAvatar(
      formData,
      'd8679948-57c4-4d3e-a078-0aae6aa3f73a'
    ).subscribe(
      res => {
        console.log(res);
      }
    );
    // .pipe(
    //   map((event: HttpEvent<T>) => {
    //     switch (event.type) {
    //       case HttpEventType.UploadProgress:
    //         this.file.progress = Math.round(event.loaded * 100 / event.total);
    //         break;
    //       case HttpEventType.Response:
    //         return event;
    //     }
    //   }),
    //   catchError((error: HttpErrorResponse) => {
    //     this.file.inProgress = false;
    //     return of('Upload failed');
    //   })).subscribe()
  }

  imagePreview(e: any) {
    
    
  }
}
