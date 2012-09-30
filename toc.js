/*  Copyright 2009 David Gilbert.
 This file is jquery.jqTOC.js; you can redistribute it and/or modify it under the terms of the GNU General Public
 License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

 For documentation refer to: http://solidgone.org/Jqtoc
 */
(function ($) {
	$.fn.jqTOC = function (settings) {

		function tocToggleDisplay(e) {
			$('#' + settings.tocContainer + ' .toc_content')[e.data.mode]();
		}

		settings = $.extend({
			tocWidth: '220px',
			tocTitle: 'Table of contents',
			tocStart: 1,
			tocEnd: 5,
			tocContainer: 'toc_container',
			tocAutoClose: false,
			tocShowOnClick: true,
			tocTopLink: ''
		}, settings || {});

		// create the main content container if not already created
		if (document.getElementById(settings.tocContainer) == null)
			$('body').append('<div id="' + settings.tocContainer + '"></div>');

		$('#' + settings.tocContainer)/*.css('width',settings.tocWidth)*/.append(
				(settings.tocTitle ? '<span class="toc_header">' + settings.tocTitle + '</span>' : '') +
						'<div class="toc_content"></div>'
		);


		var t = $('#' + settings.tocContainer + ' .toc_content');
		var headerLevel, headerId;

// Find the highest level heading used within the range tocStart..tocEnd. Prevents indenting when no higher level exists.
		var start = settings.tocEnd;
		/*this.children().each(function(i) {
		 headerLevel = this.nodeName.substr(1);
		 if(
		 this.nodeName.match(/^h\d+$/)
		 && headerLevel >= settings.tocStart
		 && headerLevel <= settings.tocEnd
		 && this.nodeName.substr(1) < start
		 ) {
		 start = this.nodeName.substr(1);
		 }
		 if (start == settings.tocStart) {
		 return false;
		 }
		 });
		 */
		settings.tocStart = start;

		this.children().each(function (i) {
			headerLevel = 1 * this.nodeName.substr(1);
			if (
					this.tagName.match(/^H\d+$/i) == this.tagName
					) {
				var headerId = this.id || 'heading' + i;

				if (this.id == null) {
					$(this).attr('id', headerId);
				}
				t.append('<a href="' + window.location.origin + window.location.pathname + '#' + headerId + '" style="margin-left: ' + (headerLevel - 1.3) * 1 + 'em;" ' +
						(headerLevel != settings.tocStart ? 'class="indent" ' : '') +
						'>' + $(this).text() + '</a>'
				);
				this.id = headerId;

				if (settings.tocTopLink) {
					$(this).before('<div class="toc_top"><a href="#">' + settings.tocTopLink + '</a></div>');
				}
			}
		});

		if (settings.tocShowOnClick) {
			if (settings.tocTitle) {
				$('#' + settings.tocContainer + ' .toc_header').bind('click', {mode: 'toggle'}, function (e) {
					tocToggleDisplay(e);
				});
			}
			if (settings.tocAutoClose) {
				$('#' + settings.tocContainer + ' .toc_content a').bind('click', {mode: 'hide'}, function (e) {
					tocToggleDisplay(e);
				});
			}
		} else {
			$('#' + settings.tocContainer + ' .toc_content').show();
		}
		if (settings.tocTopLink) {
			$('.toc_top').bind('click', function () {
				window.scrollTo(0, 0);
			});
		}

		if($('#' + settings.tocContainer + ' .toc_content a').length<3){
			$('#' + settings.tocContainer).hide();
		}
		return this;
	}
})(jQuery);