import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
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
import { Observable } from 'rxjs';

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
  selectedFileNames: string[] = [];
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  selectFiles(event: any): void {
    console.log(event.target.files);
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
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
  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
  upload(idx: number, file: File): void {
    console.log(this.roomId, 'haha');
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      this.roomService.uploadRoomImages(this.roomId, file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            // this.imageInfos = this.s.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }
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
  addNewRoom() {
    console.log(this.roomForm.value);
    if (this.roomForm.valid) {
      this.roomService.createRoom(this.roomForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.roomForm.reset();
          this.dialogRef.close('add');
        },
        error: (err) => {
          alert(err.toString());
          console.log(err);
          this.dialogRef.close();
        },
      });
    }
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
  ngDoCheck() {
    if (this.roomForm.dirty) {
      this.isChange = false;
      console.log('DO CHECK');
    }
  }
}
