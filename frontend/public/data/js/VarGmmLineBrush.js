/**
 * Created by halil on 22/08/2017.
 */







var GmmLineBrushSelectedPointIndexes = {};
var GmmLineBrushInstances = {};


function VarGmmLineBrush(container){
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
    "yscale":d3.scale.linear().domain([this.ylimit,0]).range([0,boxWidth]),
    "x":function(){},
    "y":function(){},
    "rx":function(){},
    "ry":function(){}


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

    this.brushExtent = this.brushExtent;
    var class_ = $(this).parent().attr("class");
    var dimName = class_.substring("corrbrush_panel  gmmlinebrush_panel_".length, class_.indexOf("___"));
    var distinguishedClass = class_.substring(class_.indexOf(" ")+2);
    //console.log("gmmline.brush.extent:",d3.select(this).datum());
    var dimName = d3.select(this).datum().dimName;
    var brushIdx = d3.select(this).datum().brushIdx;
    var dimname_ = dimName.split("___")[0];

    var gmmlineBrushInstance = GmmLineBrushInstances[dimname_].brushes[brushIdx];
    console.log("gmmlineBrushInstance.brush.extent:",gmmlineBrushInstance.brush.extent());
    // endg
    //   .data(extent)
    //   .attr("transform", function(d,i){
    //     return "translate(" + d[0] + "," + d[1] + ")";
    //   })
    // ;
  };


  this.intersectGMMLinesAndBrushExtent = function(gmms, extent_){

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
      if (line_in_extentsy && line_in_x) {
        //determine the gaussian's ranges
        var gaussianRange;
        if (line_x1_in_extent && line_x2_in_extent) {
          gaussianRange= [line_x1,line_x2];
        } else if (line_x1_in_extent) {
          gaussianRange= [line_x1,x2];
        } else {
          gaussianRange= [x1,line_x2];
        }
        hash[i]=gaussianRange;
      }
    }
    return hash;
  };

  this.brushend = function (){
    this.brushExtent = this.brushExtent;
    var class_ = $(this).parent().attr("class");
    var dimName = class_.substring("corrbrush_panel  gmmlinebrush_panel_".length, class_.indexOf("___"));
    var distinguishedClass = class_.substring(class_.indexOf(" ")+2);
    //console.log("gmmline.brush.extent:",d3.select(this).datum());
    var dimName = d3.select(this).datum().dimName;
    var brushIdx = d3.select(this).datum().brushIdx;
    var dimname_ = dimName.split("___")[0];

    var gmmlineBrushInstance = GmmLineBrushInstances[dimname_].brushes[brushIdx];
    var extent_ = gmmlineBrushInstance.brush.extent();
    var gmms = gmmlineBrushInstance.gmms;
    var intersects = gmmlineBrushInstance.intersectGMMLinesAndBrushExtent(gmms, extent_);
    //intersects = {1:[x1,x2],2:[x1,x2]}
    console.log("brushend.intersects:",intersects);
    console.log("brushend.intersects.data:",gmms, extent_);


  };

  this.createGmmLineBrush = function (){//cb:gmmLine brush
    //var cb = this.brushes[idx];
    console.log("createGmmLineBrush:",this.gmms);
    var g_ = this.container;
    var yfactor=0.2;

    //gmms: [{x1:0.8,x:0.9}]

    this.scales.xscale = d3.scale.linear().domain([this.gmms["extent"][0],this.gmms["extent"][1]]).range([0,boxWidth]);

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



    //see:https://bl.ocks.org/mqg/c4f70354e9d05b80f1d4
    this.brush = d3.svg.brush()
        .x(this.scales.xscale)
        .y(this.scales.yscale)
        .extent([[100, 100], [200, 200]]);

    this.brush.on("brush", this.brushing).on("brushend",this.brushend);


    this.container
      .append("g")
      .attr("class", "gmmline_rectbrush gmmline_rectbrush_"+(this.dimsBrushIdx+1))
      .datum({"dimName":this.dimName, "brushIdx":this.dimsBrushIdx})
      .call(this.brush)
    ;

    this.brushExtent = this.brush.extent();
    console.log("gmmline.brush.start.extent:",this.brushExtent);

    // gmmLineBrush.b2= g_.append("svg:circle")
    //   .attr("class", "gmmLine_brush gmmLine_brush_c2")
    //   .attr('cx', this.brushes[idx].x)
    //   .attr('cy', this.brushes[idx].y)
    //   .attr('r', this.brushes[idx].r2)
    //   .style('fill', "lightgreen")
    //
    //   .call(this.drag);
    //
    // gmmLineBrush.b1= g_.append("svg:circle")
    //   .attr("class", "gmmLine_brush gmmLine_brush_c1")
    //   .attr('cx', this.brushes[idx].x)
    //   .attr('cy', this.brushes[idx].y)
    //   .attr('r', this.brushes[idx].r1)
    //   .style('fill', "white")
    //
    //   .call(this.drag);
    //
    // gmmLineBrush.b1handle= g_.append("svg:circle")
    //   .attr("class", "gmmLine_brush_handle cbhandle_"+idx+"_"+0)
    //   .attr('cx', this.brushes[idx].x+cbConfig.brushes[idx].r1)
    //   .attr('cy', this.brushes[idx].y)
    //   .attr('r', 3)
    //   .call(this.drag);
    //
    // gmmLineBrush.b2handle= g_.append("svg:circle")
    //   .attr("class", "gmmLine_brush_handle cbhandle_"+idx+"_"+1)
    //   .attr('cx', this.brushes[idx].x+cbConfig.brushes[idx].r2)
    //   .attr('cy', this.brushes[idx].y)
    //   .attr('r', 3)
    //   .call(this.drag);

    //this.brushes[idx].brush = gmmLineBrush;
  };


  this.start = function(data, dimName, markBrushedLinesCB, gmmlineCount) {
    console.log("new gmm line brush created");
    this.data = data;
    this.dimName = dimName;

    this.markBrushedLinesCB = markBrushedLinesCB;
    this.gmmlineCount = gmmlineCount;
    var dimname_ = dimName.split("___")[0];
    this.gmms = data[dimname_][this.gmmlineCount+""];

    if (GmmLineBrushInstances[dimname_]==null)
      GmmLineBrushInstances[dimname_]={"brushes":[]};

    //this is the dimName's length index of brushes instances.
    this.dimsBrushIdx=GmmLineBrushInstances[dimname_].brushes.length;
    GmmLineBrushInstances[dimname_].brushes.push(this);

    this.createGmmLineBrush();

  };


}


