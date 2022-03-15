import { UserService } from './../../services/user.services';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'app/services/auth-service';
import { BehaviorSubject } from 'rxjs';
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
  @ViewChild('fileUpload') fileUpload: ElementRef;
  @Input() public user: any;
  filePath!: string;
  userValue!: any;

  imagePath: any;
  imgSrc: any;
  isPreview = false;
  isSave = false;
  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userValue = this.authService.userValue;

    this.userService.isUploadAvatar$.subscribe((isUploadAvatar) => {
      if (isUploadAvatar) {
        this.userService.findUserBy(this.userValue.id).subscribe((data) => {
          this.user = data;
          this.setPreview(false);
        });
      }
    });
  }

  public isPreview$$ = new BehaviorSubject<boolean>(false);
  isPreview$ = this.isPreview$$.asObservable();

  setPreview(isPreview: boolean) {
    this.isPreview$$.next(isPreview);
  }

  onSave() {
    this.uploadFile();
  }

  onCancel() {
    this.setPreview(false);
  }

  onClick() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      console.log('change ne`');
      console.log(this.isPreview, 'trc');
      if (fileInput.files[0]) {
        this.file = {
          data: fileInput.files[0],
          inProgress: false,
          progress: 0,
        };

        let reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(this.file.data);
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
      this.fileUpload.nativeElement.value = '';
    };
  }
  async uploadFile() {
    const formData = new FormData();

    this.userService
      .updateAvatar(formData, this.userValue.id)
      .subscribe((data) => {
        return this.userService.findUserBy(this.userValue.id);
      });

    this.userService
      .updateAvatar(formData, this.userValue.id)
      .subscribe((data) => {
        return this.userService.findUserBy(this.userValue.id);
      });
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.imgSrc = binaryString;
    console.log('imgSrc:', this.imgSrc);
    this.setPreview(true);
  }
}
