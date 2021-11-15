import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
  constructor() { }

  getDateTime() {
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = date + ' ' + time;
    return dateTime;
  }
}
