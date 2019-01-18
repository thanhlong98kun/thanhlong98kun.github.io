$(function () {
    var tlmHome = new TimelineMax({
        delay: 1
    });
    tlmHome
        .add(hiThere())
        .add(TweenMax.from('#star svg', 1.5, {
            autoAlpha: 0,
            scale: 0,
            rotation: 60,
            ease: Elastic.easeOut.config(2.5, 0.3)
        }))
        .add(TweenMax.to("#star .before, #star .after", 1.5, {
            width: "12rem",
            ease: Elastic.easeOut.config(1, 0.3)
        }), '-=1.2')
        .add(typed());


    function hiThere() {
        var tlm_hiThere = new TimelineMax({
            onComplete: closeText
        });
        let splitText = new SplitText("#hiThere", {
            type: "words, chars"
        });
        let chars = splitText.chars;
        for (let i = 0; i < chars.length; i++) {
            tlm_hiThere
                .from(chars[i], .8, {
                    y: -100,
                    autoAlpha: 0,
                    ease: Bounce.easeOut,
                }, Math.random() * 0.6);
        }

        function closeText() {
            splitText.revert();
        }
        return tlm_hiThere;
    }

    function typed() {
        var tlm_typed = new TimelineMax({
            repeat: -1
        });
        let item = $("#typed p");
        for (let i = 0; i < item.length; i++) {
            let text = new SplitText(item[i], {
                type: "words, chars"
            });
            tlm_typed
                .staggerFromTo(text.chars, .15, {
                    autoAlpha: 0,
                    y: 30,
                }, {
                    autoAlpha: 1,
                    y: 0
                }, .05)
                .staggerTo(text.chars, .15, {
                    opacity: 0,
                    y: -30,
                    delay: 3
                }, .05);
        }
        return tlm_typed;
    };


    // function getTranslateX() {
    //     var style = window.getComputedStyle($slider);
    //     var matrix = new WebKitCSSMatrix(style.webkitTransform);
    //     console.log('translateX', matrix.m41);
    // }



    // const $slider = $('#slider');
    // var $walk = 0;
    // var $w_slide = $('.slide').width();
    // var $wm_slide = $('.slide').outerWidth();
    // let isDown = false;


    // $slider.on('mousedown touchstart', function (event) {
    //     isDown = true;
    //     var e = event || window.event;
    //     var startX = e.pageX;
    //     $slider.on('mousemove touchmove', function (event) {
    //         if (!isDown) return;
    //         var e = event || window.event;
    //         $walk = e.pageX - startX;
    //         TweenMax.to($slider,.1, {x: $walk} );
    //     });
    // });

    // $slider.on('mouseup touchend', function (e) {
    //     isDown = false;
    //     $slider.off('mousemove touchmove');
    //     if(Math.abs($walk) < $w_slide/2) {
    //         TweenMax.to($slider, .4, {x: 0});
    //     } else {
    //         console.log($walk);
    //         if($walk < 0) {
    //             TweenMax.to($slider, .3, {x: -$wm_slide + 'px'});
    //         }
    //     }
    // });


    const $slider = document.getElementById('slider');
    var isDown = false;
    var startX;
    var walk;

    $slider.addEventListener('mousedown', function (event) {
        isDown = true;
        var e = event || window.event;
        startX = e.pageX || e.originalEvent.touches[0].pageX;
    });

    $slider.addEventListener('mouseleave', function (event) {
        isDown = false;
    });
    $slider.addEventListener('mouseup', function (event) {
        isDown = false;
    });

    $slider.addEventListener('mousemove', function (event) {
        if (!isDown) return;
        var e = event || window.event;
        var x = e.pageX || e.originalEvent.touches[0].pageX;
        walk = x - startX;
        TweenMax.to($slider, .01, {x: walk});
    });


})