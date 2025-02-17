import { Injectable } from "@angular/core";
import * as moment from 'moment';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class DateService {
  // Receiving date
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  changeMonth(direction: number) {
    const value = this.date.value.add(direction, 'month');
    this.date.next(value)
  }

  changeDate(date: moment.Moment) {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month()
    });

    this.date.next(value);
  }
}
