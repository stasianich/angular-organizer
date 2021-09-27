import { Component } from '@angular/core';
import {DateService} from "../shared/date.service";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {

  constructor(
    private dateService: DateService
  ) { }

  getDate() {
    return this.dateService.date;
  }

  changeCurrentMonth(step: number) {
    this.dateService.changeMonth(step);
  }
}
