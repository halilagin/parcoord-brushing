/**
 * Created by halil on 05/10/2017.
 */

var ExperimentAction = function (type,time, data) {
  this.type= type;
  this.time= time;
  this.data= data;



};
var Experiment=function (){
  this.startTime = new Date().getMilliseconds();
  this.actions = [];

  this.addAction = function(expAction) {
    if (expAction.type=="ExperimentStart")
      expAction.time = this.now();
    else {
      if (this.getStartAction()===undefined) {
        console.log("experiment started by "+expAction.type);
        this.start();
      }
      expAction.time =  this.now() - this.startTime ;
    }
    this.actions.push(expAction);
  };

  this.getStartAction = function() {
    return this.actions.filter(function (obj){
      return obj.type=="ExperimentStart";
    })[0];
  };

  this.getActions = function() {
    return this.actions;
  };

  this.now = function() {
    return new Date().getTime();
  };

  this.start = function() {
    this.startTime = this.now();
    this.addAction(new ExperimentAction("ExperimentStart", this.startTime, {}));
  };


  this.init = function(){
    console.log("Experiment loaded!");
    $("#ExperimentContainer").append("<button id='ExperimentStart'>Start</button>");
    $("#ExperimentStart").click(()=>{
      this.start();
    });

    $("#ExperimentContainer").append("<button id='ExperimentTestAction'>Test Action</button>");
    $("#ExperimentTestAction").click(()=>{
      this.addAction(new ExperimentAction("TestAction", null, {}));
    });


    $("#ExperimentContainer").append("<button id='ExperimentEnd'>End</button>");
    $("#ExperimentEnd").click(()=>{

      $(".debrmanager_dialog").dialog("open");

      $(".debrmanager_dialog").parent().css({
        "width":"100%",
        "height":"100%",
        "left":'0px',
        "top":'0px'
      });

    });



    this.surveyShortListManager = new SurveyShortListManager();
    //this.surveyShortListManager.init();
    this.debriefingManager = new DebriefingManager({"tasks":["task1","task2","task3","task4","task5","task6","task7","task8","task9"]});
    //this.debriefingManager.init();

  };

  this.init();

};


var experiment = new Experiment();


