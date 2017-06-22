/**
* Coworking wheel
* Author: David Gamet | http://www.studiogalaxie.fr/
*
* Licensed under the Creative Commons Attribution-ShareAlike License, Version 4.0 (the "License")
* You may obtain a copy of the License at
* https://creativecommons.org/licenses/by-sa/4.0/
*
* Date: June 15, 2017
*/

/**
* window.onload
*/
window.onload = function(){

/** vars
*/
const jsonfile = '../coworkings.json';
var coworkings = '';
var vcard = '';
var flaglaunch = false;

/** init()
* Get json or error
*/
function init(){
    var jqxhr = $.getJSON(jsonfile)
    .done(function(data){
        coworkings = data.coworkings;
        $('.launch').css('display', 'block');
    })
    .fail(function(){
        var fail = 'Failed to load json source';
        $('.coworking .org').html(fail);
        $('.coworking').addClass('open');
    });
}
init();

/** launch()
* Get a random coworking and display it
*/
function launch(){
    var random = getRandomInt(0, coworkings.length);
    // console.log(random, flaglaunch);
    if(flaglaunch){
        $('.coworking .detail').slideUp(500, function(){
            $('.coworking .org').slideUp(250, function(){
                populate(coworkings[random]);
                $('.coworking .org').slideDown(250, function(){
                    $('.coworking .detail').slideDown(500);
                });
            });
        });
    } else {
        populate(coworkings[random]);
        $('.coworking').addClass('open');
        $('.coworking .org').slideDown(250, function(){
            $('.coworking .detail').slideDown(500);
        });
        $('.launch .btn').text('Restart');
        flaglaunch = true;
    }
}

/** populate(coworkingobject)
* Set coworking infos in fields
*/
function populate(coworkingobject){
    // erase previous datas
    $('.coworking .org').html('');
    $('.vcard').html('');
    // write datas
    var org = '<a href="'+coworkingobject.website+'" target="_blank">'+coworkingobject.org+'</a>';
    $('.coworking .org').html(org);
    vcard = '<p class="org"><strong>'+coworkingobject.org+'</strong></p>';
    if(coworkingobject.zipcode || coworkingobject.city) vcard += '<div class="adr">';
    if(coworkingobject.address) vcard += '<p class="street-address">'+coworkingobject.address+'</p>';
    if(coworkingobject.zipcode || coworkingobject.city) vcard += '<p><span class="postal-code">'+coworkingobject.zipcode+'</span> <span class="locality">'+coworkingobject.city+'</span></p>';
    if(coworkingobject.zipcode || coworkingobject.city) vcard += '</div>';
    if(coworkingobject.tel) vcard += '<p class="tel"><span class="type">Work :</span> <span class="value">'+coworkingobject.tel+'</span></p>';
    // if(coworkingobject.email) vcard += '<p>Email : <span class="email">'+coworkingobject.email+'</span></p>';
    if(coworkingobject.website) vcard += '<p>Website : <a class="url" href="'+coworkingobject.website+'" target="_blank">'+coworkingobject.website+'</a></p>';
    $('.vcard').html(vcard);
}

/** getRandomInt(min, max)
* @param min - integer
* @param max - integer
* @return integer
*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// actions
$('.launch').on('click', '.btn', function(){
    launch();
});

}
