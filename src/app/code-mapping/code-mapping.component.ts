import { Component } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFilesService } from '../shared/_services/upload-file.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-code-mapping',
  templateUrl: './code-mapping.component.html',
  styleUrls: ['./code-mapping.component.css']
})
export class CodeMappingComponent {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  oneCodeForm = new FormGroup({
    internal_code: new FormControl('', [
      Validators.required
    ]),
    portal_code: new FormControl('', [
      Validators.required
    ])
  });
  fileInfos?: Observable<any>;
  codesForm: FormGroup;

  constructor(private fb: FormBuilder,
    private uploadService: UploadFilesService) {
    this.codesForm = this.fb.group({
      codes: this.fb.array([this.oneCodeForm])
    })
   }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  codes(): FormArray {
    return this.codesForm.get("codes") as FormArray
  }

  newCode(): FormGroup {
    return new FormGroup({
      internal_code: new FormControl('', [
        Validators.required
      ]),
      portal_code: new FormControl('', [
        Validators.required
      ])
    });
  }

  addItem() {
    this.codes().push(this.newCode());
  }

  deleteItem(i: number) {
    this.codes().removeAt(i);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
  }

  manualCodesSubmit(){
    console.log(this.codesForm.value)
  }
}
