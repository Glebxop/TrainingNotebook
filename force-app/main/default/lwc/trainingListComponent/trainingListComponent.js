import { LightningElement } from "lwc";
import getTrains from "@salesforce/apex/Train.getTrains";
export default class TrainingListComponent extends LightningElement {
  trainings;

  connectedCallback() {
    getTrains().then(data => {
      if (data) {
        this.trainings = data;
      }
    });
  }
}
