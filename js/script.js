function include(scriptUrl) {
    document.write('<script src="' + scriptUrl + '"></script>');
}

function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};

/* common.JS
 ========================================================*/
include('../js/common.js');

/* Easing library
 ========================================================*/
include('../js/jquery.easing.1.3.js');

/* Jquery-ui.JS
 ========================================================*/
include('../js/jquery-ui.js');

/* cookie.JS
 ========================================================*/
include('../js/jquery.cookie.js');

/* SLB.JS
 ========================================================*/
include('../js/slb.layer.js');

/* ToTop
 ========================================================*/
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop')) {
        include('../js/jquery.ui.totop.js');

        $(document).ready(function () {
            $().UItoTop({
                easingType: 'easeOutQuart',
                containerClass: 'toTop fa fa-arrow-up'
            });
        });
    }
})(jQuery);

$(document).on("keyup",'.cellphone',function(e){
	$(this).val($(this).val().setNumberPhone());
});

/* Camera
========================================================*/
;(function ($) {
var o = $('#camera');
    if (o.length > 0) {
        if (!(isIE() && (isIE() > 9))) {
            include('../js/jquery.mobile.customized.min.js');
        }

        include('../js/camera.min.js');

        $(document).ready(function () {
            o.camera({
                autoAdvance: true,
                height: '805px',
                minHeight: '890px',
                pagination: true,
                thumbnails: false,
                playPause: false,
                hover: false,
                loader: 'none',
                navigation: false,
                navigationHover: false,
                mobileNavHover: false,
                fx: 'simpleFade'
            })
        });
    }
})(jQuery);

/* Superfish menus (Web)
 ========================================================*/
;
(function ($) {
    include('../js/superfish.js');    
})(jQuery);

/* Slidebars menus (Mobile)
 ========================================================*/
;
(function ($) {
    include('../js/slidebars.js');
})(jQuery);

/* Stick up menus
 ========================================================*/
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop')) {
        include('../js/superstickup.js');

        $(document).ready(function () {
            $('#stuck_container').TMStickUp({})
        });
    }
})(jQuery);

/* Subbars menus (Sub)
 ========================================================*/
/*;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop')) {
        include('../js/superbars.js'); 
    }
})(jQuery);*/

/* printThis.JS
 ========================================================*/
/*include('../js/printThis.js');
$(document).on("click",'#printThis',function(e){
											 
	$('.sub_right_container').printThis();
	
});*/

/* Orientation tablet fix
 ========================================================*/
/*$(function () {
    // IPad/IPhone
    var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
        ua = navigator.userAgent,

        gestureStart = function () {
            viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6, initial-scale=1.0";
        },

        scaleFix = function () {
            if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
                viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
                document.addEventListener("gesturestart", gestureStart, false);
            }
        };

    scaleFix();
    // Menu Android
    if (window.orientation != undefined) {
        var regM = /ipod|ipad|iphone/gi,
            result = ua.match(regM);
        if (!result) {
            $('.sf-menus li').each(function () {
                if ($(">ul", this)[0]) {
                    $(">a", this).toggle(
                        function () {
                            return false;
                        },
                        function () {
                            window.location.href = $(this).attr("href");
                        }
                    );
                }
            })
        }
    }
});
var ua = navigator.userAgent.toLocaleLowerCase(),
    regV = /ipod|ipad|iphone/gi,
    result = ua.match(regV),
    userScale = "";
if (!result) {
    userScale = ",user-scalable=0"
}
document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0' + userScale + '">');*/