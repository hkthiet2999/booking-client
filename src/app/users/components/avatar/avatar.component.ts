import { UserService } from './../../services/user.services';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/services/auth-service';
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
  imgSrc: any;

  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
) {}

  ngOnInit(
  ): void{
    this.user = this.authService.userValue

  }
  isPreview = false
  isSave = false;
  onSave() {
    this.isSave = !this.isSave;
    this.uploadFile();
    // window.location.reload();
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

      let reader = new FileReader();

      reader.readAsDataURL(this.file.data); 
      reader.onload = (_event) => { 
        this.imgSrc = reader.result; 
      }

      this.isPreview = !this.isPreview
      console.log(this.imgSrc);

    };
  }

  async uploadFile() {
    const formData = new FormData();
    
    await formData.append('image', this.file.data);

    this.userService.updateAvatar(
      formData,
      this.user.id
    ).subscribe((data) => {
      return this.userService.findUserBy(this.user.id)
    });

  }

}
