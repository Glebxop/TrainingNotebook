import { LightningElement, api } from "lwc";

export default class TrainNowCard extends LightningElement {
  @api
  exercise;

  get isTime() {
    if (this.exercise.timeOfEx) {
      return true;
    } else false;
  }
  get isCount() {
    if (this.exercise.count) {
      return true;
    } else false;
  }
}
