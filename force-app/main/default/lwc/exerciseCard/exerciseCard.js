import { LightningElement, api } from "lwc";

export default class ExerciseCard extends LightningElement {
  @api exercise;

  click(event) {
    console.log(this.exercise.Id);

    const selectedEvent = new CustomEvent("selected", {
      detail: this.exercise
    });

    // Dispatches the event.
    this.dispatchEvent(selectedEvent);

    //console.log(event.currentTarget.id);
  }
}
