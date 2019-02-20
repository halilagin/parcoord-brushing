/**
 * Created by halil on 05/10/2017.
 */


var OrderCorrAlg1 = function(variables, corrs){
  this.variables  = [];
  this.corrs = {};
  this.init = function(variables_, corrs_) {
    this.variables = variables_;


//corrs are double in corrs, for example variables a and b has two values a___b and b___a reduce it.
    for (var i=0;i<this.variables.length;i++){
      for (var j=i+1;j<this.variables.length;j++){
          var corrpairkey = this.variables[i]+"___"+this.variables[j];
          this.corrs[corrpairkey] = corrs_[corrpairkey];
      }
    }
  };



//find the highest corr value. if there is an omitteds list, skip those.
// if omitteds is empty, it will get highest one by no dependencies. this will be the first highest one.

  this.findRootHighestCorrForVariable = function(sequence){
    var keys = Object.keys(this.corrs);
    var highest = -10;
    var highestKey = "";
    var pairName="";

    var highestValueFound=false;
    keys.forEach((key_,idx)=>{

      var isAlreadyVisited = sequence.length>0 && sequence.filter((item)=>{
          var pairs = key_.split("___");
          return item.key == pairs[0]+"___"+pairs[1] || item.key == pairs[1]+"___"+pairs[0];
        }).length>0;

        if (isAlreadyVisited==false) {
          var corrValue = this.corrs[key_].corr[0][1];
          if (corrValue>highest) {
            highestValueFound = true;
            highest = corrValue;
            highestKey = key_;
            pairName= key_.split("___")[1];
          }
        }
    });

    if (highestValueFound)
      return {"variable":highestKey.split("___")[0],"value":highest, "key":highestKey, "pairName":pairName};
    return null;//not found
  };


  this.findHighestCorrSequenceForVariable = function(vrb, sequence){

    var keys = Object.keys(this.corrs);
    if (sequence.length>=this.variables.length)
      return;

    var highest = 0;
    var highestKey = "";
    var pairName="";

    var highestValueFound=false;
    keys.forEach((key_,idx)=>{

      var isAlreadyVisited = sequence.length>0 && sequence.filter((item)=>{
          var pairs = key_.split("___");
          return item.key == pairs[0]+"___"+pairs[1] || item.key == pairs[1]+"___"+pairs[0];
        }).length>0;

      if (isAlreadyVisited==false) {
        if (key_.startsWith(vrb + "___") || key_.endsWith("___" + vrb)) {
          var corrValue = Math.abs(this.corrs[key_].corr[0][1]);

          if (corrValue > highest) {
            highestValueFound = true;
            highest = corrValue;
            highestKey = key_;
            var pairs = key_.split("___");
            pairName = vrb==pairs[0] ? pairs[1] : pairs[0];
          }
        }
      }
    });

    if (highestValueFound==false)
      return;


    var item = {"variable":vrb,"value":highest, "key":highestKey, "pairName":pairName};
    sequence.push(item);
    this.findHighestCorrSequenceForVariable(item.pairName, sequence);
    return;
  };


  this.makeUnique = function(sequence) {
    var uniques = [];


    sequence.forEach(( item, idx)=>{

      if (uniques.includes(item.variable)==false && uniques.length<=this.variables.length)
        if (item.variable!=null && item.variable!=undefined && item.variable!="undefined")
          uniques.push(item.variable);
    });

    if (uniques.length<this.variables.length) {

      this.variables.forEach((item,idx)=>{
        if (uniques.includes(item.variable)==false && uniques.length<=this.variables.length)
          if (item.variable!=null && item.variable!=undefined && item.variable!="undefined")
            uniques.push(item.variable);
      });
    }

    return uniques;
  };

  this.runAlg=function() {

    var sequence = [];
    var keysCount = Object.keys(this.corrs).length;

      while(true) {
        var rootKey = this.findRootHighestCorrForVariable(sequence);
        if (rootKey==null)
          break;
        sequence.push(rootKey);
        var corrPair = this.findHighestCorrSequenceForVariable(rootKey.pairName, sequence);
        if (sequence.length >= keysCount)
          break;
      }

    var uniqueSequence = this.makeUnique(sequence);
    return uniqueSequence;
  };

  this.start = function() {

    var result = this.runAlg();

    return result;
  };

  this.init(variables, corrs);
};

var OrderAxesManager=function (){




  this.htmls={
    "DialogOrderAxes":`
        <div class="DialogOrderAxes" title="Order Axes">
          <div class="OA_buttons">
            <span class="OA_button OA_button_remove_item ui-button-icon ui-icon ui-icon-closethick" title="Remove variable"></span>
            <span class="OA_button OA_button_order_corr ui-button-icon ui-icon ui-icon-shuffle" title="Order according to the correlation values"></span>
            <span class="OA_button OA_button_saveorder ui-button-icon ui-icon ui-icon-check" title="Save new order"></span>
             
          </div>
          <div>
          
            <div class="OA_twowayselect_container">
              
              <div class="OA_twowayselect_left">
                <div>Original variables</div>
                <div>
                  <select multiple="multiple" size="10" class="OA_origaxeslist" style="width: 150px !important; height: 200px !important;"></select>
                </div>
              </div>
              
              <div class="OA_twowayselect_middle">
                <span class="OA_twowayselect_moveright ui-button-icon ui-icon ui-icon-arrowthick-1-e" style="display:block;margin-bottom:7px;"></span>
                <span class="OA_twowayselect_moveleft ui-button-icon ui-icon ui-icon-arrowthick-1-w" style="display:block;"></span>
              </div>
              
              <div class="OA_twowayselect_right">
                <div>
                  <div>Ordered variables <span class="ordering_progressing" style="display:none;"> <img src="/public/images/parcoord/progressing.gif"></span></div>
                  <select multiple="multiple" size="10"  class="OA_axeslist" style="width: 150px !important; height: 200px !important;"></select>
                 </div>
                 <div>
                    <span class="OA_twowayselect_moveup ui-button-icon ui-icon ui-icon-arrowthick-1-n" ></span>
                    <span class="OA_twowayselect_movedown ui-button-icon ui-icon ui-icon-arrowthick-1-s" ></span>
                 </div>
              </div>
              
              <br style="clear: left;" />
            
            </div>
            
          </div>
        </div>`,

  };


  this.getAxesLabels = function(expAction) {

  };

  this.getStartAction = function() {
  };

  this.removeOrderAxis = function(){
    var isSelected = $(".OA_origaxeslist").find("option:selected").length;
    if (isSelected==0){
      console.log("Please select a variable.");
      return;
    }

    $(".OA_origaxeslist").find("option:selected").remove();

  };


  this.orderCorrByAlg1 = function(variables){
    this.orderCorrAlg = new OrderCorrAlg1(variables, estcorr_remote_data.eigens);
    var corrKeySequence = this.orderCorrAlg.start();
    return corrKeySequence;

  };

  this.orderCorr = function (){
    var variables = [];
    $(".OA_axeslist").find("option").each((idx,opt)=>{
      variables.push($(opt).attr("value"));
    });
    $(".OA_button_saveorder").css("display", "none !important");
    $(".ordering_progressing").css("display", "block");
    console.log("ordering started");
    var newSequence;
    setTimeout(
      ()=> {
        newSequence = this.orderCorrByAlg1(variables);
        $(".OA_button_saveorder").css("display", "");
        $(".ordering_progressing").css("display", "none");
        console.log("ordering ended");
        $(".OA_axeslist option").remove();
        newSequence.forEach((item)=>{
          $(".OA_axeslist").append(`<option value="${item}">${item}</option>`);
        });
      }, 1000);



  };

  this.moveUp = function (){
    //$(this).parents('.leg').insertBefore($(this).parents('.leg').prev());
    var selected = $(".DialogOrderAxes").find(".OA_axeslist option:selected");
    selected.insertBefore(selected.prev());

  };

  this.moveDown = function (){
    var selected = $(".DialogOrderAxes").find(".OA_axeslist option:selected");
    selected.insertAfter(selected.next());

  };

  this.saveDimensionsOrder=function(){
    var newSequence = [];
    $(".DialogOrderAxes").find(".OA_axeslist option").each((idx,opt)=>{
      newSequence.push($(opt).attr("value"));

    });
    $(".DialogOrderAxes").find(".OA_origaxeslist option").each((idx,opt)=>{
      newSequence.push($(opt).attr("value"));
    });

    //order axes according to the newSequence
    //dimensions = newSequence;
    // background.attr("visibility", "hidden");
    // foreground.attr("d", path);

    $("svg").remove();
    x=null;
    y=null;
    start(estcorr_remote_data, newSequence);

  };

  this.showDialogOrderAxes = function(){

    $(".DialogOrderAxes").dialog("destroy");
    $(".DialogOrderAxes").remove();
    $("body").append(this.htmls.DialogOrderAxes);

    //estcorr_remote_data is the remote data storage, globally declared. csv formatted. each row is a hash, having variables names, namly axes titles.
    var axe = estcorr_remote_data.csv[0];
    var axeNames = Object.keys(axe);
    axeNames.forEach((name)=>{
      $(".DialogOrderAxes").find(".OA_origaxeslist").append(`<option value="${name}">${name}</option>`);
    });


    $(".OA_button_remove_item").click(()=>{
        this.removeOrderAxis();
    });


    $(".OA_button_order_corr").click(()=>{
      var corrSequence= this.orderCorr();
      console.log(corrSequence);
    });

    $(".OA_twowayselect_moveright").click(()=>{
      $(".DialogOrderAxes").find(".OA_origaxeslist option:selected").appendTo($(".DialogOrderAxes .OA_axeslist"));
    });

    $(".OA_twowayselect_moveleft").click(()=>{
      $(".DialogOrderAxes").find(".OA_axeslist option:selected").appendTo($(".DialogOrderAxes .OA_origaxeslist"));
    });

    $(".OA_button_saveorder").click(()=>{
        this.saveDimensionsOrder();
    });

    $(".OA_twowayselect_moveup").click(()=>{
      this.moveUp();
    });

    $(".OA_twowayselect_movedown").click(()=>{
      this.moveDown();
    });



    $(".DialogOrderAxes").dialog({
      autoOpen:false,
      width:400,
      height:500,
      buttons:{
        "OK": function(){
          $(this).dialog("close");
        }
      }
    });

    $(".DialogOrderAxes").dialog("open");

  };

  this.initShowOrderAxesDialog= function (){
    // $(".DialogOrderAxes").dialog("destroy");
    // $(".DialogOrderAxes").remove();
    // $("body").append(this.htmls.DialogOrderAxes);
    //
    // //estcorr_remote_data is the remote data storage, globally declared. csv formatted. each row is a hash, having variables names, namly axes titles.
    // var axe = estcorr_remote_data.csv[0];
    // var axeNames = Object.keys(axe);
    // axeNames.forEach((name)=>{
    //   $(".DialogOrderAxes").find(".OA_axeslist").append(`<option value="${name}">${name}</option>`);
    // });
    // $(".DialogOrderAxes").dialog({
    //   autoOpen:false,
    //   buttons:{
    //     "OK": function(){
    //       $(this).dialog("close");
    //     }
    //   }
    // });
  };


  //removes dimensions after dimName
  this.removeAfter = function(dimName){
    var idx = dimensions.findIndex((val)=>{return val==dimName;});
    var newDimensions = [];
    var removedDimensions = [];
    for (var i=0;i<dimensions.length;i++){
      if (i<(idx+1))
        newDimensions[i] = dimensions[i];
      else
        removedDimensions[i] = dimensions[i];
    }
    console.log("removeAfter.idx:",idx);
    dimensions = newDimensions;

    //remove dimensions discarded from the dataset
    for (var i=0;i<estcorr_remote_data.csv.length;i++){
      var newRow = {};
      Object.keys(estcorr_remote_data.csv[i]).forEach((key)=>{
        if (newDimensions.findIndex((val)=>{return val==key;})>-1)
          newRow[key] = estcorr_remote_data.csv[i][key];
      });
      estcorr_remote_data.csv[i]=newRow;
    }


    $("svg").remove();

    start(estcorr_remote_data, dimensions);
  };

  this.init = function(){
    console.log("Order axes manager created!");

  };

  this.init();

};


var orderAxesManager = new OrderAxesManager();


