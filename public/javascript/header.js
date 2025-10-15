$(function() {
    $('.links p').on('click', ()=> {
        let link_value = $(this).text();
        console.log(link_value);
    });
});