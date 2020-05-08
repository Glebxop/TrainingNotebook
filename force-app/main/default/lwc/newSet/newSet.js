import { LightningElement, api, track } from "lwc";
import { parserT } from "c/timeParser";

export default class NewSet extends LightningElement {
  count;
  timeOfEx;
  @track
  secondsTimer = 0;
  timerId;
  @api
  exercise;

  get isCount() {
    return this.exercise.isCount__c;
  }
  get isTime() {
    return this.exercise.isTime__c;
  }

  countM(event) {
    this.count = event.target.value;
  }
  timeM(event) {
    this.timeOfEx = event.target.value;
  }

  connectedCallback() {
    if (!this.isTime) {
      this.timerId = setInterval(() => {
        this.secondsTimer++;
      }, 1000);
    }
  }

  save() {
    let timeRecord;
    if (this.isTime) {
      timeRecord = this.timeOfEx;
    } else {
      timeRecord = this.createTimeString;
    }
    clearInterval(this.timerId);
    const selectedEvent = new CustomEvent("selected", {
      detail: {
        count: this.count,
        exId: this.exercise.Id,
        exName: this.exercise.Name,
        timeOfEx: timeRecord
      }
    });

    this.dispatchEvent(selectedEvent);
  }

  get createTimeString() {
    return parserT(this.secondsTimer);
  }
}
