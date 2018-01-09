/**
 * Created by halil on 05/10/2017.
 */


var SVGToggleSwitch=function (params_){


  /**
   * thanks to jfmdev:
   * original source code: https://github.com/jfmdev/SaVaGe/blob/master/src/savage.js
   *
   * @param params
   * @returns {{g: SVGToggleSwitch, getValue: (function()), setValue: (SVGToggleSwitch.setAtRight|*), remove: (function())}}
   */
  this.init = function(params){

    if(typeof params !== 'object') params = {};
    if(typeof params.value !== 'boolean') params.value = true;
    if(typeof params.height !== 'number') params.height = 20;
    if(typeof params.width !== 'number' || params.width < params.height) params.width = parseInt(params.height*1.6, 10);
    if(typeof params.radius !== 'number') params.radius = params.height/2 - 4;
    if(typeof params.duration !== 'number') params.duration = 200;
    if(typeof params.colors !== 'object') params.colors = {};
    if(typeof params.dimension !== 'string') params.dimension = "class";

    if(params.container === undefined) params.container = $("svg");
    if(params.colors.backLeft === undefined) params.colors.backLeft = "#d21";
    if(params.colors.foreLeft === undefined) params.colors.foreLeft = "white";
    if(params.colors.backRight === undefined) params.colors.backRight = "#2a2";
    if(params.colors.foreRight === undefined) params.colors.foreRight = "white";


    this.params = params;

    this.idClass = $(this.params.container[0][0]).attr("class").split(" ")[1];
    console.log("tgswitch:",$(this.params.container[0][0]).attr("class"),this.idClass);
    // Define internal variables.
    this.atRight = this.params.value;

    // Calculate SVG dimensions and position offset.
    var gHeight = params.height;
    var gWidth = params.width;
    var offsetX = 0;
    var offsetY = 0;
    if(this.params.radius*2 > this.params.height) {
      gHeight = this.params.radius*2;
      gWidth = parseInt(this.params.width + (this.params.radius*2 - this.params.height), 10);
      offsetX = parseInt((gWidth - this.params.width)/2, 10);
      offsetY = parseInt((gWidth - this.params.width)/2, 10);
    }

    // Create widget.
    this.gouter = params.container.append("g")
      .attr("width", gWidth)
      .attr("height", gHeight)
      .attr("transform","translate(70,10)");

    this.g = this.gouter.append("g")
      .attr("width", gWidth)
      .attr("height", gHeight)
      .attr("transform","rotate(90,"+this.params.width+","+this.params.height+")");

    this.g.style("cursor","pointer");
    var rect = this.g.append("rect")
      .attr("x", offsetX)
      .attr("y", offsetY)
      .attr("rx", this.params.height/2)
      .attr("ry", this.params.height/2)
      .style("fill", this.atRight? this.params.colors.backRight : params.colors.backLeft)
      .attr("width", this.params.width)
      .attr("height", this.params.height);
    var circle = this.g.append("circle")
      .attr("cx", (this.atRight? (this.params.width-this.params.height/2) : (this.params.height/2)) + offsetX)
      .attr("cy", this.params.height/2 + offsetY)
      .attr("r", this.params.radius)
      .style("fill", this.atRight? this.params.colors.foreRight : this.params.colors.foreLeft);

    // Define internal functions.
    this.setAtRight = function(newValue) {
      this.atRight = newValue;
      circle.transition().duration(this.params.duration)
        .attr("cx", (this.atRight? (this.params.width-this.params.height/2) : (this.params.height/2)) + offsetX)
        .style("fill", this.atRight? this.params.colors.foreRight : this.params.colors.foreLeft);
      rect.transition().duration(this.params.duration).style("fill", this.atRight? this.params.colors.backRight : this.params.colors.backLeft);

    };

    // Define result's object.
    var res = {
      'g' : this.g,
      'getValue': ()=> { return this.atRight; },
      'getPanelCssClass': ()=> {return this.idClass; },

      'setValue': this.setAtRight,
      'remove': () =>{ this.g.remove(); }
    };

    // Define click listener.
    this.g.on('click', (data, index)=>{
      this.setAtRight(!this.atRight);
      if(typeof this.params.onChange === 'function') this.params.onChange(res);
    });

    return res;
  };

  this.init(params_);

};





