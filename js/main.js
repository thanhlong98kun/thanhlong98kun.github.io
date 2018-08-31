$(function () {

    // preloader
    var width = 100,
        perfData = window.performance.timing,
        EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
        time = parseInt((EstimatedTime / 1000) % 60) * 100;

    // Loadbar Animation
    $(".loadbar").animate({
        width: width + "%"
    }, time);

    // Loadbar Glow Animation
    $(".glow").animate({
        width: width + "%"
    }, time);

    // Percentage Increment Animation
    var PercentageID = $("#precent"),
        start = 0,
        end = 100,
        durataion = time;
    animateValue(PercentageID, start, end, durataion);

    function animateValue(id, start, end, duration) {

        var range = end - start,
            current = start,
            increment = end > start ? 1 : -1,
            stepTime = Math.abs(Math.floor(duration / range)),
            obj = $(id);

        var timer = setInterval(function () {
            current += increment;
            $(obj).text(current + "%");
            //obj.innerHTML = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // Fading Out Loadbar on Finised
    setTimeout(function(){
      $('.preloader-wrap').fadeOut(300);
    }, time);



    // MENU
    var $menuList2 = $('#menu-list2');
    var $menuTM = new TimelineMax({
        yoyoEase: true,
        paused: true
    });
    $menuTM
        .fromTo($menuList2, .5, {
            y: "-100%"
        }, {
            y: "0%",
            ease: Expo.easeOut
        })
        .staggerFrom('#menu-list2 li.nav-item', .4, {
            cycle: {
                x: [-100, 100]
            },
            opacity: 0
        }, .2);

    $('#btn-menu').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $menuList2.toggleClass('showList2');
        if ($menuList2.hasClass('showList2')) {
            $menuTM.play().timeScale(1);
        } else {
            $menuTM.timeScale(3).reverse();
        }
        return false;
    });

    // CLICK VAO MENU
    var $homePos = $('header').offset().top;

    $menu_link2 = $('#menu-list2 .nav-link');
    $menu_link2.click(function (e) {
        e.preventDefault();
        $('#btn-menu').removeClass('open');
        $menuList2.removeClass('showList2');
        $menuTM.timeScale(3).reverse();
        let $idValue = $(this).data('id');
        if ($idValue == '#home') {
            TweenMax.to(window, .7, {
                scrollTo: $homePos,
                ease: Expo.easeIn,
                delay: .8
            });
        } else {
            TweenMax.to(window, .7, {
                scrollTo: $idValue,
                ease: Expo.easeIn,
                delay: .8
            });
        }
    })

    var $menu_link1 = $('#menu-list1 .nav-link');
    $menu_link1.click(function (e) {
        e.preventDefault();
        let $idValue = $(this).data('id');
        if ($idValue == '#home') {
            TweenMax.to(window, .7, {
                scrollTo: $homePos,
                ease: Expo.easeIn
            });
        } else {
            TweenMax.to(window, .7, {
                scrollTo: $idValue,
                ease: Expo.easeIn
            });
        }
    })



    // **************************************************

    var typed1 = new Typed("#text-run", {
        strings: ["Chào mừng bạn đã đến với Website của tôi.", "Tôi là Nguyễn Thành Long.", "Tôi là sinh viên trường đại học Nha Trang.", "Kéo xuống và xem những thông tin về tôi nhé!!!"],
        typeSpeed: 50,
        backSpeed: 20,
        backDelay: 5000,
        cursorChar: '_',
        smartBackspace: true,
        loop: true,
    });

    $('[data-toggle="tooltip"]').tooltip();
    // *****************************************************
    // PROGRESS
    var $progress_flags = false;
    var $progress_time = 1.5;

    function runProgress(obj) {
        let $obj = $(obj);
        let $width_bar = $obj.width();
        let $value = $obj.attr('aria-valuenow');
        let $bar_inner = $obj.find('.progress-bar');
        let $text_inner = $bar_inner.next();
        TweenMax.to($bar_inner, $progress_time, {
            width: $value + "%",
            ease: Bounce.easeOut,
            onUpdate: changeIt,
            onUpdateParams: [$width_bar, $bar_inner, $text_inner]
        });
    }

    function changeIt($width_bar, $bar_inner, $text_inner) {
        let x = $bar_inner.width();
        let i = Math.floor((x / $width_bar) * 100);
        $text_inner.text(i + '%');

    }

    function runProgressAll($obj) {
        $obj.each(function (index, el) {
            runProgress(el);
        })
    }

    var $thirdPos = $('#ab-content').offset().top;
    $(window).scroll(function () {
        var $bodyPos = $('html').scrollTop();
        if ($bodyPos > 85) {
            $('#menu').addClass('show-menu');
        } else {
            $('#menu').removeClass('show-menu');
        }
        if ($bodyPos >= $thirdPos) {
            if (!$progress_flags) {

                runProgressAll($('.progress'));

                $progress_flags = true;
            }
        }
    });

    // END PROGRESS
    // **********************************
    // 
    var $pf_list = $('#pf-list-item').isotope({
        itemSelector: '.card',
        // resizable: false,
        masonry: {
            columnWidth: 10,
            fitWidth: true
        }
    });

    $('#btn-pf li').click(function () {
        var $filterValue = $(this).data('filter');
        $pf_list.isotope({
            filter: $filterValue,
        })
    })



})