/**
 * Created by halil on 22/08/2017.
 */

function SVGContextMenu() {
  var height,
    width,
    margin = 0.1, // fraction of width
    items = [],
    selectFn=null,
    onSelect = function(){},

    rescale = false,
    style = {
      'rect': {
        'mouseout': {
          'fill': 'rgb(244,244,244)',
          'stroke': 'white',
          'stroke-width': '1px'
        },
        'mouseover': {
          'fill': 'rgb(200,200,200)'
        }
      },
      'text': {
        'fill': 'steelblue',
        'font-size': '13'
      }
    };

  function menu(x, y, this_) {
    var dimName = $(this_).parent().attr("class").split(" ")[1].substring("dimension_buttonpanel_".length);

    var transform_ = $(this_).parent().attr("transform");
    var part1 = transform_.substring(transform_.indexOf(",")+1);
    var yval = part1.substring(0, part1.indexOf(")"));
    d3.select('.context-menu').remove();
    scaleItems();

    // Draw the menu
    d3.select('svg')
      .append('g')
      .attr("transform", function(d) { return "translate(" + d3.event.x +","+ yval  + ")"; })

      .attr('class', 'context-menu')
      .selectAll('tmp')
      .data(items).enter()
      .append('g').attr('class', 'menu-entry')
      .style({'cursor': 'pointer'})
      .on('mouseover', function(){
        d3.select(this).select('rect').style(style.rect.mouseover) })
      .on('mouseout', function(){
        d3.select(this).select('rect').style(style.rect.mouseout) })
      ;

    d3.selectAll('.menu-entry')
      .append('rect')
      .attr('x', x)
      .attr('y', function(d, i){ return y + (i * height); })
      .attr('width', width)
      .attr('height', height)
      .style(style.rect.mouseout)
    ;

    d3.selectAll('.menu-entry')
      .append('text')
      .text(function(d){ return d; })
      .attr('x', x)
      .attr('y', function(d, i){ return y + (i * height); })
      .attr('dy', height - margin / 2)
      .attr('dx', margin)
      .style(style.text)
      .on("click", function (d) {
        selectFn(dimName,d);
      });

    // Other interactions
    d3.select('body')
      .on('click', function() {
        d3.select('.context-menu').remove();
      });

  }

  menu.items = function(e) {
    if (!arguments.length) return items;
    for (i in arguments) items.push(arguments[i]);
    rescale = true;
    return menu;
  };

  menu.onSelect = function(f) {
    selectFn = f;
    return menu;
  };

  // Automatically set width, height, and margin;
  function scaleItems() {
    if (rescale) {
      d3.select('svg').selectAll('tmp')
        .data(items).enter()
        .append('text')
        .text(function(d){ return d; })
        .style(style.text)
        .attr('x', -1000)
        .attr('y', -1000)
        .attr('class', 'tmp');
      var z = d3.selectAll('.tmp')[0]
        .map(function(x){ return x.getBBox(); });
      width = d3.max(z.map(function(x){ return x.width; }));
      margin = margin * width;
      width =  width + 2 * margin;
      height = d3.max(z.map(function(x){ return x.height + margin / 2; }));

      // cleanup
      d3.selectAll('.tmp').remove();
      rescale = false;
    }
  }

  return menu;
}
