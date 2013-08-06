// Generated by CoffeeScript 1.6.3
(function() {
  var $, find_width_in_pixels;

  $ = jQuery;

  find_width_in_pixels = function(width) {
    var result, _container;
    _container = $("<div></div>").css({
      "display": "none",
      "width": width
    });
    $("body").append(_container);
    result = _container.width();
    _container.remove();
    return result;
  };

  $.fn.extend({
    tightfit: function(options) {
      var fit, settings, target_width,
        _this = this;
      settings = {
        width: "parent",
        bind_events: true,
        max: 200
      };
      settings = $.extend(settings, options);
      if (settings.width === "parent") {
        target_width = this.parent().width();
      } else {
        if (typeof settings.width === "string") {
          target_width = find_width_in_pixels(settings.width);
        }
      }
      if (settings.bind_events) {
        if (settings.width === "parent") {
          $(window).resize(function() {
            return fit(_this, _this.parent().width());
          });
        } else {
          $(window).resize(function() {
            return fit(_this, target_width);
          });
        }
      }
      fit = function(source_elm, target_width) {
        var $source_elm, fontsize_ratio;
        $source_elm = $(source_elm);
        fontsize_ratio = (1.0 * find_width_in_pixels($source_elm.css("font-size"))) / find_width_in_pixels($source_elm.width());
        console.log(fontsize_ratio);
        return $source_elm.css("font-size", Math.floor(fontsize_ratio * target_width) + "px");
      };
      return fit(this, target_width);
    }
  });

}).call(this);

/*
//@ sourceMappingURL=tightfit.map
*/