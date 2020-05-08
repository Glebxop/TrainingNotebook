global with sharing class Train {
    @AuraEnabled(cacheable=true)
    global static List<Train__c> getTrains(){
        return [SELECT Id,Name,TrainingDate__c, (SELECT id,Excercise__r.name, Count__c,Time__c  FROM ExcerciseInTrains__r) FROM Train__c WHERE Id IN (SELECT Train__c FROM ExcerciseInTrain__c) ORDER BY CreatedDate];
    }

    @AuraEnabled(cacheable=true)
    global static List<Excercise__c> getExercises(){
        return [SELECT Id,Name,isCount__c,isTime__c, Picture__c, Rating__c FROM Excercise__c ORDER BY Rating__c DESC];
    }

    @AuraEnabled(cacheable=true)
    global static List<Excercise__c> findExercises(String nameExcer){
        return [SELECT Id,Name,isCount__c,isTime__c, Picture__c FROM Excercise__c WHERE Name LIKE : nameExcer ORDER BY Rating__c DESC];
    }



}