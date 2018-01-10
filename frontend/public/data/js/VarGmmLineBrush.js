/**
 * Created by halil on 22/08/2017.
 */




// for multiple brush
// see:http://bl.ocks.org/ludwigschubert/0236fa8594c4b02711b2606a8f95f605


//var GmmLineBrushSelectedPointIndexes = {};
var GmmLineBrushActiveInstances = {};


function VarGmmLineBrush(container){
  this.subbrushes=[];
  this.container = container;
  this.gmmLineBrushConfig = null;
  this.brushes= [];
  this.xlimit =10;
  this.ylimit = 10;
  this.brushExtent;
  this.brush=null;
  this.DimsBrushIdx=0;//this instance in the brush instance of dimName and it is dimName's DimsBrushIdx brush. see start.
  this.scales={
    "xscale":d3.scale.linear().domain([0,this.xlimit]).range([0,boxWidth]),
    "yscale":d3.scale.linear().domain([this.ylimit,0]).range([0,boxWidth])


  };


  this.gmmLine_brush_handle_dragstart = function (){
    var this__= d3.select(this);
    this__.style('fill', 'red');
  };

  this.gmmLine_brush_handle_drag = function (){
    var this__= d3.select(this);
    this__.attr('cx', d3.event.x)
      .attr('cy', d3.event.y);

    var clazz = $(this).attr("class").split(" ")[1];
    var _idx= clazz.indexOf("_");
    var idxes =clazz.substring(_idx+1).split("_");

    var brushIdx= idxes[0];
    var handleIdx = idxes[1];

    var brushHandle =gmmLineBrushConfig.brushes[brushIdx].brush.b1;
    if (handleIdx==1)
      brushHandle = gmmLineBrushConfig.brushes[brushIdx].brush.b2;

    var newR = Math.sqrt(Math.pow(d3.event.x-gmmLineBrushConfig.brushes[brushIdx].x, 2)+Math.pow(d3.event.y-gmmLineBrushConfig.brushes[brushIdx].y, 2));
    brushHandle.attr("r", newR);
  };


  this.gmmLine_brush_handle_dragend = function (){

  };


  this.drag = d3.behavior.drag()
    .on('dragstart', this.gmmLine_brush_handle_dragstart)
    .on('drag', this.gmmLine_brush_handle_drag)
    .on('dragend', this.gmmLine_brush_handle_dragend);




  //see: https://bl.ocks.org/mqg/c4f70354e9d05b80f1d4
  this.brushing = function (){

    // this.brushExtent = this.brushExtent;
    // var class_ = $(this).parent().attr("class");
    // var dimName = class_.substring("gmmlinebrush_panel gmmlinebrush_panel_".length, class_.indexOf("___"));
    // var brushIdx = +class_.substring(class_.lastIndexOf("_")+1)-1;
    // var distinguishedClass = class_.substring(class_.indexOf(" ")+1);
    // var gmmlineBrushInstance = GmmLineBrushActiveInstances[dimName].brushes[brushIdx].brushInstance;

  };


  this.intersectGMMLinesAndBrushExtent = function(gmms, extent_){

    var isArraySorted = function(arr) {
      //for the array having elements arr[i]<arr[i+1]
      for (var i=0;i<arr.length-1;i++){
        if (arr[i]>arr[i+1])
          return false
      }
      return true;
    };

    var hash = {};
    //extent's xy coords.
    var x1 = extent_[0][0];
    var x2 = extent_[1][0];
    var y1 = extent_[0][1];
    var y2 = extent_[1][1];

    for (var i=0;i<gmms.ranges.length;i++){
      var line_x1 = gmms.ranges[i][0];
      var line_x2 = gmms.ranges[i][1];
      var line_y = gmms.yranges[i];

      var line_in_extentsy = line_y>y1 && line_y<y2;
      var line_x2_in_extent = line_x2>x1 && line_x2<x2;
      var line_x1_in_extent = (line_x1>x1 && line_x1<x2);
      var line_in_x = line_x1_in_extent || line_x2_in_extent;

      var case1 = [x1,line_x1,line_x2,x2];//brush covers all
      var case2 = [line_x1,x1,line_x2,x2];//brush covers right part
      var case3 = [x1,line_x1,x2, line_x2];//brush covers left part
      var case4 = [line_x1, x1,x2, line_x2];//brush covers inside part

      var inCase1 = isArraySorted(case1);
      var inCase2 = isArraySorted(case2);
      var inCase3 = isArraySorted(case3);
      var inCase4 = isArraySorted(case4);


      if (line_in_extentsy) {
        if (inCase1)
          hash[i] = [line_x1, line_x2];
        else if (inCase2)
          hash[i] = [x1, line_x2];
        else if (inCase3)
          hash[i] = [line_x1, x2];
        else if (inCase4)
          hash[i] = [x1, x2];
      }
      // if (line_in_extentsy ) {
      //   if (line_in_x) {
      //     //determine the gaussian's ranges
      //     var gaussianRange;
      //     if (line_x1_in_extent && line_x2_in_extent) {
      //       gaussianRange = [line_x1, line_x2];
      //     } else if (line_x1_in_extent) {
      //       gaussianRange = [line_x1, x2];
      //     } else {
      //       gaussianRange = [x1, line_x2];
      //     }
      //     hash[i] = gaussianRange;
      //   }
      // }
    }
    return hash;
  };

  this.selectPointsBetweenTheExtent = function(intersectRange, dimName, idx) {

    return null;
  };


  this.brushstart = function(){

  };

  this.collectBrushesIntersectedPoints = function() {
    var gmmlineBrushInstance = this;
    var gmms = gmmlineBrushInstance.gmms;
    var dimName = gmmlineBrushInstance.dimName;
    var brushesExtents = [];
    brushesExtents.push(gmmlineBrushInstance.brush.extent());
    for (var i=0;i<gmmlineBrushInstance.subbrushes.length;i++){
      brushesExtents.push(gmmlineBrushInstance.subbrushes[i].extent())
    }

    var emClassBrushedIndexes =[];
    console.log("extents:",brushesExtents);

    for (var j=0;j<brushesExtents.length;j++){
      var extent_ = brushesExtents[j];
      if (extent_===undefined)
        continue;
      if (extent_[0][0]==0 && extent_[0][1]==0 && extent_[1][0]==0 && extent_[1][1]==0)
        continue;
      var intersects = gmmlineBrushInstance.intersectGMMLinesAndBrushExtent(gmms, extent_);
      console.log("intersects:",intersects);


      var intersectedClusterLabels = Object.keys(intersects);
      for (var i=0;i<intersectedClusterLabels.length;i++) {
        var intersectedRange = intersects[intersectedClusterLabels[i]];
        var emClassIndex = parseInt(intersectedClusterLabels[i]);
        //third element  stores the class label number:0,1,2,it is a float number because of np.array
        var emClassLabel = Math.floor(gmms.gmm[emClassIndex][2]);
        for (var k=0;k<gmms.predict.length;k++) {

          if (gmms.predict[k] == emClassLabel) {//if the gmm line brushed
            //do selection according to the range of the brush.
            //intersectrange is the range of the line brush that matches the selected class namely brushed line.
            //match the range with the original data.
            var val = +estcorr_remote_data.csv[k][dimName];
            if (val>intersectedRange[0] && val <intersectedRange[1] ) //if it is in the range
              emClassBrushedIndexes.push(k);//select it
          }
        }

      }
    }

    return emClassBrushedIndexes;
  };

  this.brushend = function (){
    // this.brushExtent = this.brushExtent;
    // var class_ = $(this).parent().attr("class");
    // var dimName = class_.substring("corrbrush_panel  gmmlinebrush_panel_".length, class_.indexOf("___"));
    // var distinguishedClass = class_.substring(class_.indexOf(" ")+2);
    // //console.log("gmmline.brush.extent:",d3.select(this).datum());
    // var pairName = this.pairName;//d3.select(this).datum().dimName;
    // var brushIdx = this.brushIdx;//d3.select(this).datum().brushIdx;
    // var dimname_ = this.dimName;

    this.brushExtent = this.brushExtent;
    var class_ = $(this).parent().attr("class");
    var dimName = class_.substring("gmmlinebrush_panel gmmlinebrush_panel_".length, class_.indexOf("___"));
    var brushIdx = +class_.substring(class_.lastIndexOf("_")+1)-1;
    var pairName = class_.substring("gmmlinebrush_panel gmmlinebrush_panel_".length, class_.lastIndexOf("_"));

    var distinguishedClass = class_.substring(class_.indexOf(" ")+1);
    console.log("this.brushend:",pairName, dimName, brushIdx);

    var gmmlineBrushInstance = GmmLineBrushActiveInstances[dimName].brushes[brushIdx].brushInstance;


    var extent_ = gmmlineBrushInstance.brush.extent();
    var gmms = gmmlineBrushInstance.gmms;



    // var intersects = gmmlineBrushInstance.intersectGMMLinesAndBrushExtent(gmms, extent_);
    // //intersects = {1:[x1,x2],2:[x1,x2]}
    // console.log("brushend.intersects:",intersects);
    // console.log("brushend.intersects.data:",gmms, extent_);
    //
    //
    // var intersectedClusterLabels = Object.keys(intersects);
    // var emClassBrushedIndexes =[];
    // for (var i=0;i<intersectedClusterLabels.length;i++) {
    //   var intersectedRange = intersects[intersectedClusterLabels[i]];
    //   var emClassIndex = parseInt(intersectedClusterLabels[i]);
    //   //third element  stores the class label number:0,1,2,it is a float number because of np.array
    //   var emClassLabel = Math.floor(gmms.gmm[emClassIndex][2]);
    //   for (var k=0;k<gmms.predict.length;k++) {
    //
    //     if (gmms.predict[k] == emClassLabel) {//if the gmm line brushed
    //       //do selection according to the range of the brush.
    //       //intersectrange is the range of the line brush that matches the selected class namely brushed line.
    //       console.log("intersectRange:",intersectedRange,emClassLabel);
    //       //match the range with the original data.
    //       var val = +estcorr_remote_data.csv[k][dimName];
    //       if (val>intersectedRange[0] && val <intersectedRange[1] ) //if it is in the range
    //         emClassBrushedIndexes.push(k);//select it
    //     }
    //   }
    //
    // }





    //multiple brush trial 1
    // var subbrush = d3.svg.brush();
    // console.log("gmmlineBrushInstance.subbrush:",subbrush);
    //
    //
    //   subbrush
    //     .on("brushstart", gmmlineBrushInstance.brushstart)
    //     .on("brush", gmmlineBrushInstance.brushing)
    //     .on("brushend", gmmlineBrushInstance.brushend);
    // gmmlineBrushInstance.subbrushes.push({"id": gmmlineBrushInstance.subbrushes.length, "subbrush": subbrush});
    //
    // var lastBrushID = gmmlineBrushInstance.subbrushes[gmmlineBrushInstance.subbrushes.length - 1].id;
    // console.log("subbrushid:",lastBrushID);
    // var lastBrush = document.getElementById('brush-' + lastBrushID);
    // var selection = d3.brushSelection(lastBrush);
    //
    // // If it does, that means we need another one
    // if (selection && selection[0] !== selection[1]) {
    //   newBrush();
    // }




    //multiple brush trial 2

    if (true) {
      var newIdx = gmmlineBrushInstance.subbrushes.length;
      var firstBrush = gmmlineBrushInstance.subbrushes[0];
      console.log("gmmlineBrushInstance.newbrush.distinguishedClass:", distinguishedClass);

      var brushSelection = svg.selectAll("."+distinguishedClass)
        .data([distinguishedClass]);


      brushSelection.append("g")
        .attr("class", "gmmline_subbrush gmmline_subbrush_" + newIdx)
        .each(function (d) {
          //multi-brushes
          console.log("gmmlineBrushInstance.each:", d);

          var brush_ = d3.svg.brush()
            .x(gmmlineBrushInstance.scales.xscale)
            .y(gmmlineBrushInstance.scales.yscale)
            .on("brushstart", gmmlineBrushInstance.brushstart)
            .on("brush", gmmlineBrushInstance.brushing).on("brushend", gmmlineBrushInstance.brushend);
          gmmlineBrushInstance.subbrushes.push(brush_);
          console.log("gmmlineBrushInstance.subbrushes:", gmmlineBrushInstance.subbrushes);
          d3.select(this).call(brush_);
        })
      ;// .selectAll("rect")
      // .attr("x", -8)
      // .attr("width", 16);

      var newBrush = gmmlineBrushInstance.subbrushes[gmmlineBrushInstance.subbrushes.length - 1];
      if (gmmlineBrushInstance.subbrushes.length == 1)
        firstBrush = gmmlineBrushInstance.subbrushes[0];//redefine firstbrush, if it is the first brush.

      newBrush.extent(firstBrush.extent());
      firstBrush.extent([[0, 0], [0, 0]]);

      var firstObj = $("." + distinguishedClass).find(".gmmline_subbrush_0").find(".extent");

      var newObj = $("." + distinguishedClass).find(".gmmline_subbrush_" + (gmmlineBrushInstance.subbrushes.length - 1)).find(".extent");
      var prevObj = $("." + distinguishedClass).find(".gmmline_subbrush_" + (gmmlineBrushInstance.subbrushes.length - 2)).find(".extent");

      newObj.attr("y", firstObj.attr("y"));
      newObj.attr("height", firstObj.attr("height"));
      newObj.attr("x", firstObj.attr("x"));
      newObj.attr("width", firstObj.attr("width"));

      firstObj.attr("y", 0);
      firstObj.attr("height", 0);
      firstObj.attr("x", 0);
      firstObj.attr("width", 0);


      //remove pointer-events except last added brush
      for (var i = 0; i < gmmlineBrushInstance.subbrushes.length; i++) {
        var pointersEvents_css = "none";
        if (i == 0)
          pointersEvents_css = "all";
        var css_p = $("." + distinguishedClass).find(".gmmline_subbrush_" + i);
        $("." + distinguishedClass).find(css_p).find(".background").css("pointer-events", pointersEvents_css);
        $("." + distinguishedClass).find(css_p).css("pointer-events", "all");

      }
    }





    var emClassBrushedIndexes = gmmlineBrushInstance.collectBrushesIntersectedPoints();


    //GmmLineBrushSelectedPointIndexes[dimName].brushes[brushIdx]={"brushInstance":this,"active"};
    if (GmmLineBrushActiveInstances[dimName]===undefined)
      GmmLineBrushActiveInstances[dimName]={"brushes":[]};
    if (GmmLineBrushActiveInstances[dimName].brushes[brushIdx]===undefined)
      GmmLineBrushActiveInstances[dimName].brushes[brushIdx] = {"brushInstance":this, "active":true};


    if (GmmLineBrushActiveInstances[dimName].brushes[brushIdx].active)
      GmmLineBrushActiveInstances[dimName].brushes[brushIdx]["indexes"] = emClassBrushedIndexes;


    var dimidx = {"dim":pairName,"idx":(brushIdx+1)};
    gmmlineBrushInstance.markBrushedLinesCB(dimidx);




  };

  this.createGmmLineBrush = function (){//cb:gmmLine brush
    //var cb = this.brushes[idx];
    console.log("createGmmLineBrush:",this.gmms);
    //var g_ = this.container;
    var yfactor=0.2;

    //gmms: [{x1:0.8,x:0.9}]

    this.scales.xscale = d3.scale.linear().domain([this.gmms["extent"][0]-0.1*this.gmms["extent"][0],this.gmms["extent"][1]+0.1*this.gmms["extent"][1]]).range([0,boxWidth]);




    //see:https://bl.ocks.org/mqg/c4f70354e9d05b80f1d4
    this.brush = d3.svg.brush()
        .x(this.scales.xscale)
        .y(this.scales.yscale)
        .extent([[100, 100], [200, 200]]);
    this.subbrushes.push(this.brush);

    this.brush.on("brush", this.brushing).on("brushend",this.brushend);

    var g_ = this.container.append("g").attr("class", "gmmline_subbrush gmmline_subbrush_"+0)
      ;

      g_.append("rect")
      .attr("class", "gmmlinebrushpanel_rect")
      ;

    g_.datum({"dimName":this.dimName, "brushIdx":this.dimsBrushIdx})
      //.attr("class", "gmmlinebrush_panel gmmlinebrush_panel_"+(this.dimsBrushIdx+1))
      .call(this.brush)
    ;

    //gmms should be sort by array's fist element, x1.
    //ranges denotes the number of lines.
    for (var i=0;i<this.gmms.ranges.length;i++) {
      console.log("loop:",this.gmms.ranges[i]);

      if (this.gmms["yranges"]==undefined || this.gmms["yranges"]==null)
        this.gmms["yranges"]=[];

      var y_ = this.ylimit * (0.8 - 0.2 * i);
      this.gmms["yranges"].push(y_);
      g_.append("line")
        .attr("class", "gmmline_line gmmline_line" + i)
        .attr("y1", this.scales.yscale(y_))
        .attr("y2", this.scales.yscale(y_))
        .attr("x1", this.scales.xscale(this.gmms.ranges[i][0]))
        .attr("x2", this.scales.xscale(this.gmms.ranges[i][1]))
        .attr("stroke-width", 1)
        .attr("stroke", "black");
    }



    this.brushExtent = this.brush.extent();


    var toggleOnChange = (res)=>{
      console.log("SVGToggleSwitch:",res.getValue());
      var clusterBrushPanelClass = res.getPanelCssClass();
      console.log("gmmlineBrushPanelClass:",clusterBrushPanelClass);





      var class_ = clusterBrushPanelClass;
      var dimName = class_.substring(class_.indexOf("gmmlinebrush_panel_")+"gmmlinebrush_panel_".length, class_.indexOf("___"));
      var brushIdx = +class_.substring(class_.lastIndexOf("_")+1)-1;


      var gmmlineBrushInstance = GmmLineBrushActiveInstances[dimName].brushes[brushIdx].brushInstance;


      GmmLineBrushActiveInstances[dimName].brushes[brushIdx].active=res.getValue();
      console.log("toogleonchange.dimname:",dimName, brushIdx, "active:",res.getValue());


      var dimidx = {"dim":dimName,"idx":(brushIdx+1)};
      gmmlineBrushInstance.markBrushedLinesCB(dimidx);



    };

    new SVGToggleSwitch({container:this.container,onChange:toggleOnChange});
  };


  this.start = function(data, pairName, markBrushedLinesCB, gmmlineCount) {
    console.log("new gmm line brush created");
    this.data = data;
    this.pairName = pairName;
    this.dimName = this.pairName.split("___")[0];

    this.markBrushedLinesCB = markBrushedLinesCB;
    this.gmmlineCount = gmmlineCount;
    this.gmms = data[this.dimName][this.gmmlineCount+""];

    if (GmmLineBrushActiveInstances[this.dimName]==null)
      GmmLineBrushActiveInstances[this.dimName]={"brushes":[]};

    //this is the dimName's length index of brushes instances.
    this.dimsBrushIdx=GmmLineBrushActiveInstances[this.dimName].brushes.length;
    GmmLineBrushActiveInstances[this.dimName].brushes.push({"brushInstance":this, "active":true, "indexes":[]});

    this.createGmmLineBrush();

  };


}


