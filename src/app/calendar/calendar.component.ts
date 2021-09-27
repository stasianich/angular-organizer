import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { DateService } from "../shared/date.service";

interface Day {
  value: moment.Moment,
  active: boolean,  // Активный день(сегодня)
  disabled: boolean,  // Дни, которые не входять в текущий месяц
  selected: boolean,  // Тот день, на который нажали
}

interface Week {
  days: Day[],
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  private calendar: Week[] = []

  constructor(
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    // Каждый раз, когда меняется date, будет вызыватся метод
    this.dateService.date.subscribe(this.generate.bind(this));
  }

  getCalendar() {
    return this.calendar;
  }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(0, 'day');

    const newCalendar = [];

    while(date.isBefore(endDay, 'day')) {
      newCalendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');

            return {
              value,
              active,
              disabled,
              selected
            };
          })
      })
    }

    this.calendar = newCalendar;
  }

  onSelect(day: moment.Moment) {
    this.dateService.changeDate(day);
  }
}
