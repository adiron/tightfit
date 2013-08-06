$ = jQuery

window.TIGHTFIT_DEBUG = false

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
		else
			target_width = find_width_in_pixels settings.width if typeof settings.width is "string"

		if settings.bind_events
			if settings.width is "parent"
				$(window).resize () => fit this, this.parent().width()
			else
				$(window).resize () => fit this, target_width
		fit = (source_elm, target_width) ->
			$source_elm = $ source_elm
			fontsize_ratio = (1.0 * find_width_in_pixels $source_elm.css "font-size") / find_width_in_pixels $source_elm.width()
			console.log fontsize_ratio if window.TIGHTFIT_DEBUG
			$source_elm.css("font-size", fontsize_ratio * target_width + "px");

			#_container.remove()
		fit this, target_width
