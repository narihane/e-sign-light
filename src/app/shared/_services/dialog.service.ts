import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DialogService {
  dataChange: BehaviorSubject<Document[]> = new BehaviorSubject<Document[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor() {}

  get data(): Document[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }
}
