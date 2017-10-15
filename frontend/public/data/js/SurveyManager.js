/**
 * Created by halil on 05/10/2017.
 */



var SurveyQuestionType = function (type_) {
  this.type;

  this.init = function (type) {
    this.type = type;
  };



  this.init(type_);




};

var SurveyQuestion = function (type) {
  this.type;
  this.template = "";

  this.getHtml = function(){

  };

  this.init = function(type) {
    this.type = new SurveyQuestionType(type);
  };



};
var SurveyManager=function (){


  this.questions = [];

  this.addQuestion = function(expAction) {

  };



  this.now = function() {
    return new Date().getTime();
  };

  this.start = function() {
    this.startTime = this.now();
  };


  this.initQuestions = function() {
    this.questions.push({
      type:"multipleChoice",
      html:"",
      evaluate:()=>{

      }
    });
  };

  this.init = function(){


    this.initQuestions();

  };

  this.init();

};


var experiment = new Experiment();


