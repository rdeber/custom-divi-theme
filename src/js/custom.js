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

    //initialize tooltips for clients logos
    /*
    $('.slick-grid-clients img[alt]').qtip({
        content: {
            attr: 'alt'
        },
        position: {
          target: 'mouse', // Track the mouse as the positioning target
          adjust: { x: 5, y: 5 } // Offset it slightly from under the mouse
        },
        style: {
          classes: 'client-tooltip'
        }
    });
    */
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