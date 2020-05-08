/* eslint-disable no-console */
import { LightningElement, wire, track } from "lwc";
import getExercises from "@salesforce/apex/Train.getExercises";
import findExercises from "@salesforce/apex/Train.findExercises";
import TRAINING_OBJECT from "@salesforce/schema/Train__c";
import { createRecord } from "lightning/uiRecordApi";
import ExcerciseInTrains_OBJECT from "@salesforce/schema/ExcerciseInTrain__c";
import COUNT_FIELD from "@salesforce/schema/ExcerciseInTrain__c.Count__c";
import NAME_FIELD from "@salesforce/schema/ExcerciseInTrain__c.Name";
import Exercise_FIELD from "@salesforce/schema/ExcerciseInTrain__c.Excercise__c";
import ExerciseTraining_FIELD from "@salesforce/schema/ExcerciseInTrain__c.Train__c";
import TIME_FIELD from "@salesforce/schema/ExcerciseInTrain__c.Time__c";

export default class NewTrain extends LightningElement {
  @track
  exercises;
  @track
  exercisesNow = new Array();
  @track
  exerciseExecute;
  isAdd = false;
  isExecute = false;
  trainingNow;

  @wire(getExercises)
  handleData({ data }) {
    if (data) {
      this.exercises = data;
    }
  }

  newTraining(event) {
    createRecord({ apiName: TRAINING_OBJECT.objectApiName })
      .then(data => {
        this.trainingNow = data.id;
        this.createSet(event);
        console.log("this.trainingNow");
        console.log(this.trainingNow);
      })
      .catch(exc => {
        console.log(exc);
      });
  }

  findExercises(event) {
    findExercises({ nameExcer: "%" + event.target.value + "%" }).then(
      result => {
        this.exercises = result;
        if (result.length < 1) {
          this.isAdd = true;
        } else {
          this.isAdd = false;
        }
      }
    );
  }

  setEx(event) {
    this.isExecute = true;
    this.exerciseExecute = event.detail;
  }

  newSet(event) {
    this.isExecute = false;
    this.exercisesNow.push(event.detail);
    if (!this.trainingNow) {
      this.newTraining(event);
    } else {
      this.createSet(event);
    }
  }
  createSet(event) {
    let fields = {};
    fields[NAME_FIELD.fieldApiName] = event.detail.exName;
    fields[Exercise_FIELD.fieldApiName] = event.detail.exId;
    fields[COUNT_FIELD.fieldApiName] = event.detail.count;
    fields[ExerciseTraining_FIELD.fieldApiName] = this.trainingNow;
    fields[TIME_FIELD.fieldApiName] = event.detail.timeOfEx;
    createRecord({
      apiName: ExcerciseInTrains_OBJECT.objectApiName,
      fields
    }).then(data => {
      console.log("data");
      console.log(data);
    });
  }
  cancel() {
    this.isExecute = false;
  }
}
