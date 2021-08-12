/*!

 =========================================================
 * Paper Kit - v2.2.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/paper-kit
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)

 * Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */


var transparent = true;
var big_image;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized,
  backgroundOrange = false,
  toggle_initialized = false;

$(document).ready(function() {
  window_width = $(window).width();
  var big_image;

  //  Activate the tooltips
  if ($('[data-toggle="tooltip"]').length != 0) {
    $('[data-toggle="tooltip"]').tooltip();
  }

  //  Activate regular switches
  if ($("[data-toggle='switch']").length != 0) {
    $("[data-toggle='switch']").bootstrapSwitch();
  }

  //  Append modals to <body>
  if ($(".modal").length != 0) {
    $('.modal').appendTo('body');
  }

  // Init popovers
  pk.initPopovers();

  // Activate the image for the navbar-collapse
  pk.initNavbarImage();

  // Navbar color change on scroll
  if ($('.navbar[color-on-scroll]').length != 0) {
    $(window).on('scroll', pk.checkScrollForTransparentNavbar);
  }

  $('.navbar-collapse').click(function() {
    setTimeout(function() {
      if (pk.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        pk.misc.navbar_menu_visible = 0;
        $('#bodyClick').remove();
        setTimeout(function() {
          $toggle.removeClass('toggled');
        }, 550);
      }
    }, 550);
  });

  // Change the collor of navbar collapse
  $('#navbarToggler').on('show.bs.collapse', function() {
    if ($('nav').hasClass('navbar-transparent') && $(document).scrollTop() < 50) {
      $('.navbar').addClass('no-transition');
      $('nav').removeClass('navbar-transparent');
    }
  }).on('hidden.bs.collapse', function() {
    if ($(document).scrollTop() < 50) {
      $('.navbar').removeClass('no-transition');
      $('nav:first-of-type').addClass('navbar-transparent');
    }
  });

  $navbar = $('.navbar[color-on-scroll]');
  scroll_distance = $navbar.attr('color-on-scroll') || 500;

  // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.

  if ($('.navbar[color-on-scroll]').length != 0) {
    pk.checkScrollForTransparentNavbar();
    $(window).on('scroll', pk.checkScroll)
  }

  $('.form-control').on("focus", function() {
    $(this).parent('.input-group').addClass("input-group-focus");
  }).on("blur", function() {
    $(this).parent(".input-group").removeClass("input-group-focus");
  });


  if (window_width >= 768) {
    big_image = $('.page-header[data-parallax="true"]');

    if (big_image.length != 0) {
      $(window).on('scroll', pk.checkScrollForPresentationPage);
    }
  }
  // Activate Carousel
  $('.carousel').carousel({
    interval: 4000
  });

});

$(document).on('click', '.navbar-toggler', function() {
  $toggle = $(this);

  if (pk.misc.navbar_menu_visible == 1) {
    $('html').removeClass('nav-open');
    pk.misc.navbar_menu_visible = 0;
    $('#bodyClick').remove();
    setTimeout(function() {
      $toggle.removeClass('toggled');
    }, 550);
  } else {
    setTimeout(function() {
      $toggle.addClass('toggled');
    }, 580);
    div = '<div id="bodyClick"></div>';
    $(div).appendTo('body').click(function() {
      $('html').removeClass('nav-open');
      pk.misc.navbar_menu_visible = 0;
      setTimeout(function() {
        $toggle.removeClass('toggled');
        $('#bodyClick').remove();
      }, 550);
    });

    $('html').addClass('nav-open');
    pk.misc.navbar_menu_visible = 1;
  }
});

pk = {
  misc: {
    navbar_menu_visible: 0
  },

  checkScrollForTransparentNavbar: debounce(function() {
    if ($(document).scrollTop() > $(".navbar").attr("color-on-scroll")) {
      if (transparent) {
        transparent = false;
        $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
      }
    } else {
      if (!transparent) {
        transparent = true;
        $('.navbar[color-on-scroll]').addClass('navbar-transparent');
      }
    }
  }, 17),

  initNavbarImage: function() {
    var $navbar = $('.navbar').find('.navbar-translate').siblings('.navbar-collapse');
    var background_image = $navbar.data('nav-image');

    if ($(window).width() < 991 || $('body').hasClass('burger-menu')) {
      if (background_image != undefined) {
        $navbar.css('background', "url('" + background_image + "')")
          .removeAttr('data-nav-image')
          .css('background-size', "cover")
          .addClass('has-image');
      }
    } else if (background_image != undefined) {
      $navbar.css('background', "")
        .attr('data-nav-image', '' + background_image + '')
        .css('background-size', "")
        .removeClass('has-image');
    }
  },

  initPopovers: function() {
    if ($('[data-toggle="popover"]').length != 0) {
      $('body').append('<div class="popover-filter"></div>');

      //    Activate Popovers
      $('[data-toggle="popover"]').popover().on('show.bs.popover', function() {
        $('.popover-filter').click(function() {
          $(this).removeClass('in');
          $('[data-toggle="popover"]').popover('hide');
        });
        $('.popover-filter').addClass('in');
      }).on('hide.bs.popover', function() {
        $('.popover-filter').removeClass('in');
      });

    }
  },

  // Javascript for the parallax

  checkScroll: debounce(function() {
    big_image = $('.page-header[data-parallax="true"]');
    oVal = ($(window).scrollTop() / 3);
    big_image.css({
      'transform': 'translate3d(0,' + oVal + 'px,0)',
      '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
    });
  }, 4),
}

demo = {
  initPickColor: function() {
    $('.pick-class-label').click(function() {
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if (display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};

function hasScrolled() {
  var st = $(this).scrollTop();
  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta)
    return;

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $('.navbar.nav-down').removeClass('nav-down').addClass('nav-up');
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $('.navbar.nav-up').removeClass('nav-up').addClass('nav-down');
    }
  }

  lastScrollTop = st;
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};


// wNumb
(function (factory) {

  if ( typeof define === 'function' && define.amd ) {

    // AMD. Register as an anonymous module.
    define([], factory);

  } else if ( typeof exports === 'object' ) {

    // Node/CommonJS
    module.exports = factory();

  } else {

    // Browser globals
    window.wNumb = factory();
  }

}(function(){

  'use strict';

  var FormatOptions = [
    'decimals',
    'thousand',
    'mark',
    'prefix',
    'suffix',
    'encoder',
    'decoder',
    'negativeBefore',
    'negative',
    'edit',
    'undo'
  ];

// General

  // Reverse a string
  function strReverse ( a ) {
    return a.split('').reverse().join('');
  }

  // Check if a string starts with a specified prefix.
  function strStartsWith ( input, match ) {
    return input.substring(0, match.length) === match;
  }

  // Check is a string ends in a specified suffix.
  function strEndsWith ( input, match ) {
    return input.slice(-1 * match.length) === match;
  }

  // Throw an error if formatting options are incompatible.
  function throwEqualError( F, a, b ) {
    if ( (F[a] || F[b]) && (F[a] === F[b]) ) {
      throw new Error(a);
    }
  }

  // Check if a number is finite and not NaN
  function isValidNumber ( input ) {
    return typeof input === 'number' && isFinite( input );
  }

  // Provide rounding-accurate toFixed method.
  // Borrowed: http://stackoverflow.com/a/21323330/775265
  function toFixed ( value, exp ) {
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));
    value = value.toString().split('e');
    return (+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp))).toFixed(exp);
  }


// Formatting

  // Accept a number as input, output formatted string.
  function formatTo ( decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input ) {

    var originalInput = input, inputIsNegative, inputPieces, inputBase, inputDecimals = '', output = '';

    // Apply user encoder to the input.
    // Expected outcome: number.
    if ( encoder ) {
      input = encoder(input);
    }

    // Stop if no valid number was provided, the number is infinite or NaN.
    if ( !isValidNumber(input) ) {
      return false;
    }

    // Rounding away decimals might cause a value of -0
    // when using very small ranges. Remove those cases.
    if ( decimals !== false && parseFloat(input.toFixed(decimals)) === 0 ) {
      input = 0;
    }

    // Formatting is done on absolute numbers,
    // decorated by an optional negative symbol.
    if ( input < 0 ) {
      inputIsNegative = true;
      input = Math.abs(input);
    }

    // Reduce the number of decimals to the specified option.
    if ( decimals !== false ) {
      input = toFixed( input, decimals );
    }

    // Transform the number into a string, so it can be split.
    input = input.toString();

    // Break the number on the decimal separator.
    if ( input.indexOf('.') !== -1 ) {
      inputPieces = input.split('.');

      inputBase = inputPieces[0];

      if ( mark ) {
        inputDecimals = mark + inputPieces[1];
      }

    } else {

      // If it isn't split, the entire number will do.
      inputBase = input;
    }

    // Group numbers in sets of three.
    if ( thousand ) {
      inputBase = strReverse(inputBase).match(/.{1,3}/g);
      inputBase = strReverse(inputBase.join( strReverse( thousand ) ));
    }

    // If the number is negative, prefix with negation symbol.
    if ( inputIsNegative && negativeBefore ) {
      output += negativeBefore;
    }

    // Prefix the number
    if ( prefix ) {
      output += prefix;
    }

    // Normal negative option comes after the prefix. Defaults to '-'.
    if ( inputIsNegative && negative ) {
      output += negative;
    }

    // Append the actual number.
    output += inputBase;
    output += inputDecimals;

    // Apply the suffix.
    if ( suffix ) {
      output += suffix;
    }

    // Run the output through a user-specified post-formatter.
    if ( edit ) {
      output = edit ( output, originalInput );
    }

    // All done.
    return output;
  }

  // Accept a sting as input, output decoded number.
  function formatFrom ( decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input ) {

    var originalInput = input, inputIsNegative, output = '';

    // User defined pre-decoder. Result must be a non empty string.
    if ( undo ) {
      input = undo(input);
    }

    // Test the input. Can't be empty.
    if ( !input || typeof input !== 'string' ) {
      return false;
    }

    // If the string starts with the negativeBefore value: remove it.
    // Remember is was there, the number is negative.
    if ( negativeBefore && strStartsWith(input, negativeBefore) ) {
      input = input.replace(negativeBefore, '');
      inputIsNegative = true;
    }

    // Repeat the same procedure for the prefix.
    if ( prefix && strStartsWith(input, prefix) ) {
      input = input.replace(prefix, '');
    }

    // And again for negative.
    if ( negative && strStartsWith(input, negative) ) {
      input = input.replace(negative, '');
      inputIsNegative = true;
    }

    // Remove the suffix.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
    if ( suffix && strEndsWith(input, suffix) ) {
      input = input.slice(0, -1 * suffix.length);
    }

    // Remove the thousand grouping.
    if ( thousand ) {
      input = input.split(thousand).join('');
    }

    // Set the decimal separator back to period.
    if ( mark ) {
      input = input.replace(mark, '.');
    }

    // Prepend the negative symbol.
    if ( inputIsNegative ) {
      output += '-';
    }

    // Add the number
    output += input;

    // Trim all non-numeric characters (allow '.' and '-');
    output = output.replace(/[^0-9\.\-.]/g, '');

    // The value contains no parse-able number.
    if ( output === '' ) {
      return false;
    }

    // Covert to number.
    output = Number(output);

    // Run the user-specified post-decoder.
    if ( decoder ) {
      output = decoder(output);
    }

    // Check is the output is valid, otherwise: return false.
    if ( !isValidNumber(output) ) {
      return false;
    }

    return output;
  }


// Framework

  // Validate formatting options
  function validate ( inputOptions ) {

    var i, optionName, optionValue,
        filteredOptions = {};

    if ( inputOptions['suffix'] === undefined ) {
      inputOptions['suffix'] = inputOptions['postfix'];
    }

    for ( i = 0; i < FormatOptions.length; i+=1 ) {

      optionName = FormatOptions[i];
      optionValue = inputOptions[optionName];

      if ( optionValue === undefined ) {

        // Only default if negativeBefore isn't set.
        if ( optionName === 'negative' && !filteredOptions.negativeBefore ) {
          filteredOptions[optionName] = '-';
          // Don't set a default for mark when 'thousand' is set.
        } else if ( optionName === 'mark' && filteredOptions.thousand !== '.' ) {
          filteredOptions[optionName] = '.';
        } else {
          filteredOptions[optionName] = false;
        }

        // Floating points in JS are stable up to 7 decimals.
      } else if ( optionName === 'decimals' ) {
        if ( optionValue >= 0 && optionValue < 8 ) {
          filteredOptions[optionName] = optionValue;
        } else {
          throw new Error(optionName);
        }

        // These options, when provided, must be functions.
      } else if ( optionName === 'encoder' || optionName === 'decoder' || optionName === 'edit' || optionName === 'undo' ) {
        if ( typeof optionValue === 'function' ) {
          filteredOptions[optionName] = optionValue;
        } else {
          throw new Error(optionName);
        }

        // Other options are strings.
      } else {

        if ( typeof optionValue === 'string' ) {
          filteredOptions[optionName] = optionValue;
        } else {
          throw new Error(optionName);
        }
      }
    }

    // Some values can't be extracted from a
    // string if certain combinations are present.
    throwEqualError(filteredOptions, 'mark', 'thousand');
    throwEqualError(filteredOptions, 'prefix', 'negative');
    throwEqualError(filteredOptions, 'prefix', 'negativeBefore');

    return filteredOptions;
  }

  // Pass all options as function arguments
  function passAll ( options, method, input ) {
    var i, args = [];

    // Add all options in order of FormatOptions
    for ( i = 0; i < FormatOptions.length; i+=1 ) {
      args.push(options[FormatOptions[i]]);
    }

    // Append the input, then call the method, presenting all
    // options as arguments.
    args.push(input);
    return method.apply('', args);
  }

  function wNumb ( options ) {

    if ( !(this instanceof wNumb) ) {
      return new wNumb ( options );
    }

    if ( typeof options !== "object" ) {
      return;
    }

    options = validate(options);

    // Call 'formatTo' with proper arguments.
    this.to = function ( input ) {
      return passAll(options, formatTo, input);
    };

    // Call 'formatFrom' with proper arguments.
    this.from = function ( input ) {
      return passAll(options, formatFrom, input);
    };
  }

  return wNumb;

}));