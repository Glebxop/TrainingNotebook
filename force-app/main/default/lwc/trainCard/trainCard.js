import { LightningElement, api, track } from "lwc";

export default class TrainCard extends LightningElement {
  @api training;

  @track isTrainingLook;

  showFullTraining() {
    this.isTrainingLook = !this.isTrainingLook;
  }
}
