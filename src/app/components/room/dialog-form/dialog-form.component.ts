import { Room } from './../../../services/booking.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { RoomService } from 'app/services/room.service';
import { catchError, combineLatest, forkJoin, merge, Observable, ObservableInput, of, switchMap, tap, throwError, zip } from 'rxjs';

export interface DialogData {
  title: string;
  type: string;
  content: {
    id?: string;
    codeName: string;
    size: string;
    price: number;
    images: string[];
  };
}
export interface temp {
  fileName: string;
  hashedFile: string;
}
@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
})
export class DialogFormComponent implements OnInit {
  @Output() onUpdateRoom = new EventEmitter<string>();
  isCreate: boolean = true;
  isChange: boolean = true;
  roomId: string = '';
  selectedFiles?: FileList;
  selectedFilesOfArray: any;
  selectedFileNames: string[] = [];
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  tempList: temp[];
  uploadedList: any;
  selectFiles(event: any): void {
    console.log(event.target.files);
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      this.uploadedList = Array.from(this.selectedFiles);
    }
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
          // let obj={fileName:this.selectedFiles[i].name.toString(),hashedFile:e.target.result}
          // this.tempList.push(obj)
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }
  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls).forEach((key) => {
      let currentControl = form.controls[key];

      if (currentControl.dirty) {
        if (currentControl.controls) {
          dirtyValues[key] = this.getDirtyValues(currentControl);
        } else {
          dirtyValues[key] = currentControl.value;
        }
      }
    });

    return dirtyValues;
  }
  uploadFiles(roomId: string): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.uploadedList[i], roomId);
        this.uploadedList.slice(i, 1);
      }
      this.roomForm.reset();
      this.dialogRef.close('add');
    }
    
  }

  subscription: any;
  // upload(idx: number, file: File, seriousRoomID: string): void {
  //   // console.log('A seriousRoomID, shouldnt laugh here =))', this.roomId);
  //   this.progressInfos[idx] = { value: 0, fileName: file.name };
  //   if (file) {
  //     this.roomService.uploadRoomImages(seriousRoomID, file).subscribe({
  //       next: (event) => {
  //         if (event.type === HttpEventType.UploadProgress && event.total) {
  //           this.progressInfos[idx].value = Math.round(
              
  //             (100 * event.loaded) / event.total
  //           );
  //         } else if (event instanceof HttpResponse) {
  //           const msg = 'Uploaded the file successfully: ' + file.name;
  //           this.message.push(msg);
  //           // this.imageInfos = this.s.getFiles();
  //         }
  //       },
  //       error: (err) => {
  //         this.progressInfos[idx].value = 0;
  //         const msg = 'Could not upload the file: ' + file.name;
  //         this.message.push(msg);
  //       },

  //     }
  //     );
  //   }
  // }

  // Harry
  upload(idx: number, file: File, seriousRoomID: string): Observable<any> {
    // console.log('A seriousRoomID, shouldnt laugh here =))', this.roomId);

    this.progressInfos[idx] = { value: 0, fileName: file.name };
    this.message = [];
    // if (this.selectedFiles) {
    //   for (let i = 0; i < this.selectedFiles.length; i++) {
    //     this.upload(i, this.uploadedList[i], roomId);
    //     this.uploadedList.slice(i, 1);
    //   }
      
    // }
    // 
    if(this.selectedFiles){
      this.selectedFilesOfArray = Array.from(this.selectedFiles);

    }
    
    if (file && this.selectedFilesOfArray) {
      console.log('Pre upload');
      let uploadEachImg = this.selectedFilesOfArray.map( (file: File, index: any) => {
        return this.roomService.uploadRoomImages(seriousRoomID, file).pipe(
          tap((event) => {
            if (event.type === HttpEventType.UploadProgress && event.total) {
              this.progressInfos[idx].value = Math.round(
                
                (100 * event.loaded) / event.total
              );
              this.uploadedList.slice(index, 1);
              console.log('Uploaded');
            } else if (event instanceof HttpResponse) {
              const msg = 'Uploaded the file successfully: ' + file.name;
              this.message.push(msg);
              // this.imageInfos = this.s.getFiles();
            }
          }),
          catchError(
            (err) => {
            this.progressInfos[idx].value = 0;
            const msg = 'Could not upload the file: ' + file.name;
            this.message.push(msg);
            this.uploadedList.slice(index, 1);
            return throwError(err);
          }),
        );
      });
      
      
      return combineLatest(uploadEachImg);
    };
    return of(false);
    
  }

  // end upload

  constructor(
    public dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private roomService: RoomService
  ) {}
  roomForm!: FormGroup;
  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteImg(i: number) {
    try {
      this.roomService.deleteImage(this.roomId, i).subscribe({
        error: (err) => {
          console.log(err);
        },
      });
      this.previews = this.previews.filter((e, index) => index !== i);
    } catch (error) {
      console.log(error);
    }
  }
  addNewRoom():  Observable<any> {

    // Harry

    if (this.roomForm.valid) {

      console.log('roomForm.valid: ', this.roomForm.valid);
      this.roomService.createRoom(this.roomForm.value).pipe(
        tap(room => {
          this.roomId = room.id as string;

        }),

          
        switchMap( (): any => {

          if(this.selectedFiles){

            this.upload(0, this.uploadedList[0], this.roomId).subscribe().add( () => {
              this.roomForm.reset();
              this.dialogRef.close('add');
            })

            return of(true);
          }
          
        })

      ).subscribe();
    }
    return of(false);
  }
  updateARoom() {
    let payload: object = {};
    if (this.roomForm.dirty) {
      payload = this.getDirtyValues(this.roomForm);
      console.log(payload, this.roomId);
      this.roomService.updateRoom(this.roomId, payload).subscribe({
        next: (res) => {
          console.log(res.toString());
          this.roomForm.reset();
          this.dialogRef.close('update');
        },
        error: (err) => {
          alert(err.toString());
          console.log(err);
          this.dialogRef.close();
        },
      });
    }
  }
  ngOnInit(): void {
    this.roomForm = this.fb.group({
      codeName: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
    if (this.data.content) {
      if (this.data.type === 'update') {
        this.isCreate = false;
      }
      if (this.data.content.id) {
        this.roomId = this.data.content.id;
      }
      this.roomForm.controls['codeName'].setValue(this.data.content.codeName);
      this.roomForm.controls['size'].setValue(this.data.content.size);
      this.roomForm.controls['price'].setValue(this.data.content.price);
      if (this.data.content.images) {
        this.previews = [...this.previews, ...this.data.content.images];
        console.log(this.previews, 'previews');
      }
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.previews, 'previews doi ne');
  }
  ngDoCheck() {
    if (this.roomForm.dirty) {
      this.isChange = false;
      console.log('DO CHECK');
    }
  }
}
