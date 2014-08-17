(function($) {
    $.extend($.fn, {
        expanzoom: function(){
            return this.each(function(){
                var $panzoom = $(this).panzoom({
            		disableZoom: true,
            		onStart: function(e, p, et) {
            			var t = $(et.target),
            				tp = t.parents('.piece');
            			if (tp.length || t.is('.piece')) {
            				t = tp.length ? tp : t;
            				t.one({
            					'dragstop.panzoom': function() {
            						$panzoom.panzoom('enable');
            					}
            				});
            				$panzoom.panzoom('disable');
            			}
            		},
            		onPan: function(e, o, x, y) {
            			if (x < -150) $panzoom.panzoom('pan', -150, y);
            			if (y < -175) $panzoom.panzoom('pan', x, -175);
            			if (x > 120) $panzoom.panzoom('pan', 120, y);
            			if (y > 175) $panzoom.panzoom('pan', x, 175);
            		}
            	});
            	$panzoom.parent().on('mousewheel.focal', function(e) {
            		e.preventDefault();
            		var delta = e.delta || e.originalEvent.wheelDelta;
            		var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
            		var pz = $panzoom.panzoom('zoom', zoomOut, {
            			minScale: 1,
            			maxScale: 1.5,
            			increment: 0.1,
            			animate: false,
            			focal: e
            		});
            	}); 
            });
        } 
    });
})(jQuery);