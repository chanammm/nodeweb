jQuery(window).on('load', function() {
	"use strict";
    
    
    // HIDE PRELOADER
    $(".preloader").addClass("hide-preloader");   
    
    // SHOW/ANIMATE ANIMATION CONTAINER
    setTimeout(function(){

        $("#intro .animation-container").each(function() {

            var e = $(this);

            setTimeout(function(){

                e.addClass("run-animation");

            }, e.data("animation-delay") );

        });

    }, 700 );

    
});


jQuery(document).ready(function($) {
	"use strict";
    
    
    // SMOOTH SCROLL FOR SAME PAGE LINKS
    $(document).on('click', 'a.smooth-scroll', function(event) {
        
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 80
        }, 500);
        
    });
    
    
    // SCROLL REVEAL SETUP
    window.sr = ScrollReveal();
    sr.reveal(".scroll-animated-from-right", { 
        duration: 600,
        delay: 0,
        origin: "right",
        rotate: { x: 0, y: 0, z: 0 },
        opacity: 0,
        distance: "20vh",
        viewFactor: 0.4,
        scale: 1,
    });
    
    
    // AJAX CONTACT FORM SUBMIT
    $("#contact-form").submit(function(e) {

        e.preventDefault();
        var postdata = $(this).serialize();

        if (!$("#contact-form-name").val()) {
            $("#contact-form-name").addClass("error");
            return false;
        }else{
            $("#contact-form-name").removeClass("error");
        }

        if (!$("#contact-form-email").val()) {
            $("#contact-form-email").addClass("error");
            return false;
        }else{
            $("#contact-form-email").removeClass("error");
        }

        if (!$("#contact-form-phone").val()) {
            $("#contact-form-phone").addClass("error");
            return false;
        }else{
            $("#contact-form-phone").removeClass("error");
        }

        if (!$("#contact-form-message").val()) {
            $("#contact-form-message").addClass("error");
            return false;
        }else{
            $("#contact-form-message").removeClass("error");
        }

        $.ajax({

            type: "POST",
            url: "/mail",
            data: postdata,
            dataType: "json",
            success: function(json) {

                $("#contact-form input, #contact-form textarea").removeClass("error");

                setTimeout(function(){

                    if (json.nameMessage !== "") {

                        $("#contact-form-name").addClass("error");

                    }

                    if (json.emailMessage !== "") {

                        $("#contact-form-email").addClass("error");

                    }

                    if (json.messageMessage !== "") {

                        $("#contact-form-message").addClass("error");

                    }

                    if (json.phoneMessage !== "") {

                        $("#contact-form-phone").addClass("error");

                    }

                }, 10);
                if (json.code < 1) {

                    $("#contact-form.error input, #contact-form.error textarea").removeClass("error");
                    $('#contact-form').addClass("success");
                    $('#contact-form textarea, #contact-form input').attr("placeholder","");
                    $('#contact-form input, #contact-form button, #contact-form textarea').val('').prop('disabled', true);

                }

            }

        });

    });

    
});