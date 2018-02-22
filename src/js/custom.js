jQuery(document).ready(function($) {

    // Initialize popup as usual
    $('.open-popup-link').magnificPopup({
      // Delay in milliseconds before popup is removed
      removalDelay: 500,
      enableEscapeKey: true,
      callbacks: {
        beforeOpen: function() {
           this.st.mainClass = this.st.el.attr('data-effect');
        }
      },
      // Class that is added to popup wrapper and background
      // make it unique to apply your CSS animations just to this exact popup
      mainClass: 'mfp-fade'
    });

    $('.slick-tile').attr('tabindex', '0');

    //equal height elements jquery
    $.fn.equalHeights = function(minHeight, maxHeight) {
        tallest = (minHeight) ? minHeight : 0;
        this.each(function() {
            $(this).height("");
            if($(this).height() > tallest) {
                tallest = $(this).height();
            }
        });
        if((maxHeight) && tallest > maxHeight) tallest = maxHeight;
        return this.each(function() {
            $(this).height(tallest);
        });
    }

    function handleResize() {
        //force equal heights on action blocks
        $("#what-were-up-to .et_pb_post").equalHeights();

        //force equal heights on contact form blocks
        $("#contact-forms .contact-action-block").equalHeights();

        //force equal heights on contact form posts
        $("#contact-blog .post-content p").equalHeights();
    }
    $(window).resize(handleResize).resize(); // Trigger resize handlers.
    $(window).load(handleResize);

    //randomize items function
    $.fn.shuffle = function() {

        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });

        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });

        return $(shuffled);

    };
    //apply randomizer to slick tiles
    $('.slick-grid .slick-tile').shuffle();

    //initialize slick slider for team wall
    $('.slick-grid-team').slick({
        infinite: true,
        slidesToShow: 9,
        slidesToScroll: 9,
        touchThreshold: 9,
        rows: 3,
        prevArrow: '<button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button"></button>',
        nextArrow: '<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button"></button>'
    });

    //initialize slick slider for rl-giving
    $('.slick-grid-giving').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        touchThreshold: 5,
        rows: 2
    });

    //initialize slick slider for client logos
    $('.slick-grid-clients').slick({
        infinite: true,
        slidesToShow: 9,
        slidesToScroll: 1,
        touchThreshold: 21,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: '<button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button"></button>',
        nextArrow: '<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button"></button>',
        dots: false,
        pauseOnHover: true,
        centerMode: true,
        centerPadding: '2.5rem 60px 1rem 60px',
        responsive: [{
          breakpoint: 980,
          settings: {
            slidesToShow: 7
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 5
          }
        }]
    });

    //make non-centered slick tiles clickable and move to center focus
    $('.slick-grid-clients').on('click', '.slick-slide', function (e) {
      e.stopPropagation();
      var index = $(this).data("slick-index");
      if ($('.slick-slider').slick('slickCurrentSlide') !== index) {
        $('.slick-slider').slick('slickGoTo', index);
      }
    });

    //initialize slick slider for solutions section on mobile devices only
    $('.et_mobile_device .solutions-svg-list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    //initialize tooltips in enhanced slick slider
    $('.hasTooltip').each(function() {
        $(this).qtip({
            content: {
                text: $(this).next('div')
            },
            position: {
                viewport: $(window)
            }
        });
    });

    //initialize and load solutions svg
    var s = Snap("#solutions-svg");
    Snap.load("/wp-content/themes/rl-divi/images/svg/rl-solutions-dots.svg", onSVGLoaded );

    function onSVGLoaded(svg){
        s.append(svg);

        // Set default path colors
        var icons = s.selectAll('.cls-4');
        icons.attr({fill: '#ffffff', fillOpacity: '0.75'});

        var hideTimeout;
        function showNodeContent() {
            // Deactiviate group highlighting.
            deactivateGroup1();
            deactivateGroup2();
            deactivateGroup3();
            deactivateGroup4();
            // Scale individual dot.
            var dotSel = $(this).attr('id');
            if (dotSel) {
                var dotscale = s.select('#'+dotSel);
                dotscale.animate({transform: 's1.25,1.25' }, 0, mina.easeinout);
            }
            // Scale individual icon.
            var iconSel = $(this).attr('data-icon');
            if (iconSel) {
                var iconscale = s.select('#'+iconSel);
                iconscale.animate({
                    fillOpacity:"1",
                    transform: 's1.25,1.25'
                }, 0, mina.easeinout);
            }
            // Grab data-contentsel to use to find content to show.
            var contentsel = $(this).attr('data-contentsel');
            // Verify that the content is defined.
            if (contentsel) {
                clearTimeout(hideTimeout);
                // Show content using content selector found in path attribute.
                $('.solutions-svg-list div.active').removeClass('active');
                $('.solutions-svg-list div#'+contentsel).addClass('active');
                // Hide main content.
                $('.solutions-svg-content').addClass('hidden');
                clearAutoPlay();
            }
        }
        function hideNodeContent() {
            var dotSel = $(this).attr('id');
            if (dotSel) {
                var dotscale = s.select('#'+dotSel);
                dotscale.animate({transform: 's1,1' }, 0, mina.easeinout);
            }
            var iconSel = $(this).attr('data-icon');
            if (iconSel) {
                var iconscale = s.select('#'+iconSel);
                iconscale.animate({
                    fillOpacity:"0.75",
                    transform: 's1,1'
                }, 0, mina.easeinout);
            }
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(function() {
                // Hide content using content selector found in path attribute.
                $('.solutions-svg-list div').removeClass('active');
                // Show main content.
                $('.solutions-svg-content').removeClass('hidden');
            }, 1000);

        }
        $(".circles-1 path.cls-1, .circles-2 path.cls-2, .circles-3 path.cls-3").hover(showNodeContent, hideNodeContent);
        $(".circles-1 path.cls-1, .circles-2 path.cls-2, .circles-3 path.cls-3").focusin(showNodeContent);
        $(".circles-1 path.cls-1, .circles-2 path.cls-2, .circles-3 path.cls-3").focusout(hideNodeContent);

        //handle svg content links filtering
        function activateGroup1() {
            var group1 = s.selectAll(".cls-1");
            group1.animate({transform: 's1.08,1.08' }, 0, mina.easeinout);
            $("#solutions-svg").addClass("group-1-active");
            $(".solutions-svg-btn-1").addClass("active");
            clearAutoPlay();
        }
        function deactivateGroup1() {
            var group1 = s.selectAll(".cls-1");
            group1.animate({transform: 's1,1' }, 0, mina.easeinout);
            $("#solutions-svg").removeClass("group-1-active");
            $(".solutions-svg-btn-1").removeClass("active");
            clearAutoPlay();
        }
        $(".solutions-svg-btn-1").hover(activateGroup1, deactivateGroup1);
        $(".solutions-svg-btn-1").focusin(activateGroup1);
        $(".solutions-svg-btn-1").focusout(deactivateGroup1);

        function activateGroup2() {
            var group2 = s.selectAll(".cls-2");
            group2.animate({transform: 's1.08,1.08' }, 0, mina.easeinout);
            $("#solutions-svg").addClass("group-2-active");
            $(".solutions-svg-btn-2").addClass("active");
            clearAutoPlay();
        }
        function deactivateGroup2() {
            var group2 = s.selectAll(".cls-2");
            group2.animate({transform: 's1,1' }, 0, mina.easeinout);
            $("#solutions-svg").removeClass("group-2-active");
            $(".solutions-svg-btn-2").removeClass("active");
            clearAutoPlay();
        }
        $(".solutions-svg-btn-2").hover(activateGroup2, deactivateGroup2);
        $(".solutions-svg-btn-2").focusin(activateGroup2);
        $(".solutions-svg-btn-2").focusout(deactivateGroup2);

        function activateGroup3() {
            var group3 = s.selectAll(".cls-3");
            group3.animate({transform: 's1.08,1.08' }, 0, mina.easeinout);
            $("#solutions-svg").addClass("group-3-active");
            $(".solutions-svg-btn-3").addClass("active");
            clearAutoPlay();
        }
        function deactivateGroup3() {
            var group3 = s.selectAll(".cls-3");
            group3.animate({transform: 's1,1' }, 0, mina.easeinout);
            $("#solutions-svg").removeClass("group-3-active");
            $(".solutions-svg-btn-3").removeClass("active");
            clearAutoPlay();
        }
        $(".solutions-svg-btn-3").hover(activateGroup3, deactivateGroup3);
        $(".solutions-svg-btn-3").focusin(activateGroup3);
        $(".solutions-svg-btn-3").focusout(deactivateGroup3);

        function activateGroup4() {
            var group4 = s.selectAll(".lines");
            group4.animate({transform: 's.95,.95' }, 0, mina.easeinout);
            $("#solutions-svg").addClass("group-4-active");
            $(".solutions-svg-btn-4").addClass("active");
            clearAutoPlay();
        }
        function deactivateGroup4() {
            var group4 = s.selectAll(".lines");
            group4.animate({transform: 's1,1' }, 0, mina.easeinout);
            $("#solutions-svg").removeClass("group-4-active");
            $(".solutions-svg-btn-4").removeClass("active");
            clearAutoPlay();
        }
        $(".solutions-svg-btn-4").hover(activateGroup4, deactivateGroup4);
        $(".solutions-svg-btn-4").focusin(activateGroup4);
        $(".solutions-svg-btn-4").focusout(deactivateGroup4);

        var count = 1;
        var graphicAutoPlayInPause = 3000;
        var graphicAutoPlayOutPause = 2000;
        var graphicAutoPlayIn;
        var graphicAutoPlayOut;
        function startAutoPlay(initialDelay) {
            if (!initialDelay) {
                initialDelay = 0;
            }
            graphicAutoPlayIn = setTimeout(handleGraphicAutoPlay, graphicAutoPlayInPause+initialDelay);
        }
        function clearAutoPlay() {
            clearTimeout(graphicAutoPlayIn);
            clearTimeout(graphicAutoPlayOut);
        }
        function handleGraphicAutoPlay() {
            if (count == 1) {
                activateGroup1();
                graphicAutoPlayOut = setTimeout(function() {
                    deactivateGroup1();
                    graphicAutoPlayIn = setTimeout(handleGraphicAutoPlay, graphicAutoPlayInPause);
                }, graphicAutoPlayOutPause);
            } else if (count == 2) {
                activateGroup2();
                graphicAutoPlayOut = setTimeout(function() {
                    deactivateGroup2();
                    graphicAutoPlayIn = setTimeout(handleGraphicAutoPlay, graphicAutoPlayInPause);
                }, graphicAutoPlayOutPause);
            } else if (count == 3) {
                activateGroup3();
                graphicAutoPlayOut = setTimeout(function() {
                    deactivateGroup3();
                    graphicAutoPlayIn = setTimeout(handleGraphicAutoPlay, graphicAutoPlayInPause);
                }, graphicAutoPlayOutPause);
            } else if (count == 4) {
                activateGroup4();
                graphicAutoPlayOut = setTimeout(function() {
                    deactivateGroup4();
                    graphicAutoPlayIn = setTimeout(handleGraphicAutoPlay, graphicAutoPlayInPause);
                }, graphicAutoPlayOutPause);
            }
            count++;
            if (count > 4) {
                count = 1;
            }
        }
        // TODO: delay starting until scrolled in to view...
        startAutoPlay(1000);
    };

});

//custom particle effects
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 8,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.04,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 0.2,
        "opacity_min": 0.024360931562022948,
        "sync": false
      }
    },
    "size": {
      "value": 98.64345520403408,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 20,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#555555",
      "opacity": 0.03206824121731046,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1.2,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 1.6240621041348633,
        "opacity": 0.25984993666157813,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

