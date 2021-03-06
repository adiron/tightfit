// Generated by CoffeeScript 1.6.3
(function() {
  var $, find_width_in_pixels;

  $ = jQuery;

  window.TIGHTFIT_DEBUG = false;

  window.TIGHTFIT_ERROR_FACTOR = 0.95;

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
      var f, ratio_fit, settings, target_width,
        _this = this;
      settings = {
        width: "parent",
        bind_events: true,
        max: 200
      };
      settings = $.extend(settings, options);
      if (settings.width === "parent") {
        target_width = this.parent().width();
      } else if (typeof settings.width === "string") {
        target_width = find_width_in_pixels(settings.width);
      } else {
        target_width = settings.width;
      }
      if (settings.bind_events) {
        if (settings.width === "parent") {
          f = function() {
            return ratio_fit(_this, _this.parent().width());
          };
        } else {
          f = function() {
            return ratio_fit(_this, target_width);
          };
        }
        $(window).resize(f);
        this.change(f);
      }
      ratio_fit = function(source_elm, target_width) {
        var $source_elm, fontsize_ratio;
        $source_elm = $(source_elm);
        if (!$source_elm.data("tightfit__fontsize_ratio")) {
          fontsize_ratio = (1.0 * find_width_in_pixels($source_elm.css("font-size"))) / find_width_in_pixels($source_elm.width());
          $source_elm.data("tightfit__fontsize_ratio", fontsize_ratio);
        } else {
          fontsize_ratio = $source_elm.data("tightfit__fontsize_ratio");
        }
        if (window.TIGHTFIT_DEBUG) {
          console.log("Ratio: " + fontsize_ratio);
        }
        return $source_elm.css("font-size", (fontsize_ratio * target_width) * window.TIGHTFIT_ERROR_FACTOR + "px");
      };
      return ratio_fit(this, target_width);
    }
  });

}).call(this);

/*
//@ sourceMappingURL=tightfit.map
*/
