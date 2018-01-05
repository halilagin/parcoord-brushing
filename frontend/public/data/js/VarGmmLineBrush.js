/**
 * Created by halil on 22/08/2017.
 */







var GmmLineBrushSelectedPointIndexes = {};


function VarGmmLineBrush(container){
  this.container = container;
  this.gmmLineBrushConfig = null;
  this.brushes= [];
  this.xlimit =10;
  this.ylimit = 10;

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



  this.createGmmLineBrush = function (){//cb:gmmLine brush
    //var cb = this.brushes[idx];
    var g_ = this.container;
    var yfactor=0.2;


    for (var i=1;i<=this.gmmlineCount;i++)
      g_.append("line")
        .attr("class", "gmmline_brush gmmline_line")
        .attr("y1", this.scales.yscale(this.ylimit*(0.8-0.2*i)))
        .attr("y2", this.scales.yscale(this.ylimit*(0.8-0.2*i)))
        .attr("x1", this.scales.yscale(this.ylimit*0.1))
        .attr("x2", this.scales.yscale(this.ylimit*0.9))
        .attr("stroke-width",1)
        .attr("stroke", "black");





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
    this.dimName = dimName;
    this.markBrushedLinesCB = markBrushedLinesCB;
    this.gmmlineCount = gmmlineCount;
    this.createGmmLineBrush();
  };


}


