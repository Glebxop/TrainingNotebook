import { LightningElement } from "lwc";

export default class MainComponent extends LightningElement {
  areDetailsVisible = true;
  isCreateNewTrain = false;
  isNoOneTraining;

  newTraining() {
    this.areDetailsVisible = false;
    this.isCreateNewTrain = true;
  }

  finishTraining() {
    this.areDetailsVisible = true;
    this.isCreateNewTrain = false;
  }
}
