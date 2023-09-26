jQuery(document).ready(function($) {

    $('.investments-nav li a').each(function(i, obj) {
        obj.addEventListener("click", function(event) {
            event.preventDefault();
            toggleCards(this.href.substring(this.href.indexOf('#')+1));
            $('.investments-nav li a.active-link').removeClass('active-link');
            //$('.wp-block-custom-block-investments #message').hide();
            $(this).addClass('active-link');
           
        });
    });

    if(!$('.investments-nav li a').hasClass('active-link')){
        //set a default
        $('.investments-nav li a').first().addClass('active-link');

        //add place for a message
        $('.wp-block-custom-block-investments').prepend( "<p id='message'></p>" );

        // remove hash, I cannot place an ID on these nav items,
        // this will have to do.
        toggleCards($('.investments-nav li a.active-link').attr('href').substring($('.investments-nav li a.active-link').attr('href').indexOf('#')+1));
    }
    
    function toggleCards( navId ){
        $('.wp-block-custom-investment-card').each(function(i, obj) {
            $(this).removeClass('active-card');
        });
        var count = 0;
        $('.wp-block-custom-investment-card.' +  navId).each(function(i, obj) {
            $(this).addClass('active-card');
            count = i;
        });
        //if no active cards were found, show a message.
        if(count == 0){
            $('.wp-block-custom-block-investment').hide();
            $('.wp-block-custom-block-investments #message').text('No results.');
            $('.wp-block-custom-block-investments #message').show();
        }else{
            $('.wp-block-custom-block-investment').show();
            $('.wp-block-custom-block-investments #message').hide(); 
        }

    }

});