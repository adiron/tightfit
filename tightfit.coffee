$ = jQuery

window.TIGHTFIT_DEBUG = false
# The error ratio is the ratio adjustment used to prevent scaling errors.
window.TIGHTFIT_ERROR_FACTOR = 0.95

find_width_in_pixels = (width) ->
	_container = $("<div></div>").css
		"display": "none"
		"width": width
	$("body").append(_container)
	result = _container.width()
	_container.remove()
	result

$.fn.extend
	tightfit: (options) ->
		settings = 
			width: "parent"
			bind_events: true
			max: 200

		settings = $.extend settings, options
		
		# The reason this is here is to accomodate the option to bind fit to the refresh event
		if settings.width is "parent"
			target_width = this.parent().width() 
		else if typeof settings.width is "string"
			target_width = find_width_in_pixels settings.width
		else
			target_width = settings.width

		if settings.bind_events
			# Define f
			if settings.width is "parent"
				f = () => ratio_fit this, this.parent().width()
			else
				f = () => ratio_fit this, target_width
			# Bind f
			$(window).resize f
			this.change f

		ratio_fit = (source_elm, target_width) ->
			$source_elm = $ source_elm
			if not $source_elm.data "tightfit__fontsize_ratio"
				fontsize_ratio = (1.0 * find_width_in_pixels $source_elm.css("font-size")) / find_width_in_pixels $source_elm.width()
				$source_elm.data "tightfit__fontsize_ratio", fontsize_ratio
			else
				fontsize_ratio = $source_elm.data "tightfit__fontsize_ratio"
			console.log "Ratio: #{fontsize_ratio}" if window.TIGHTFIT_DEBUG
			$source_elm.css("font-size", (fontsize_ratio * target_width) * window.TIGHTFIT_ERROR_FACTOR + "px");

		# auto_fit = (source_elm, target_width) ->

		ratio_fit this, target_width
