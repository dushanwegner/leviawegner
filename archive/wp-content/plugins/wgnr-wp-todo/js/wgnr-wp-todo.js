var string = '123abcABC-_*(!@#$%^&*()_-={}[]:\"<>,.?/~`';
var stripped = string.replace(/[^A-Za-z0-9]/g, '');

jQuery( document ).ready( function( $ ) {
    // $() will work as an alias for jQuery() inside of this function    
    var counter = 0;
    data_id = $('#wgnr-wp-to-wrapper').data("id");
    $('#wgnr-wp-to-wrapper ul, #wgnr-wp-to-wrapper ol').each(function(j){
        counter++;
        $(this).children().each(function(i){    
            const li_id = data_id + '_li_' + counter.toString();
            const storage_id = counter + '_' + $(this).text().replace(/[^A-Za-z0-9]/g, '');
    
            $(this).attr('id', li_id);    
            const clicked = localStorage.getItem(storage_id);
            if (clicked == "clicked") {
                $(this).addClass('done');
            }
    
            $(this).on("click", function(){
                $(this).toggleClass('done');
    
                if ($(this).hasClass('done')) {
                    localStorage.setItem(storage_id, 'clicked');
                } else {
                    localStorage.removeItem(storage_id);
                }
            });
        });
    })


    

} );
