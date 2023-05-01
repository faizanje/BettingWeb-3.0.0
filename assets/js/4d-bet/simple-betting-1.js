$(function () {
    simpleBettingHandler('simple-betting-1');
    populateSelectedBrandLogosProgrammatically();
    populateBetTitle();
})

function handleNextSimpleBetting4d() {

    // Define an object to store the selected brand logos and their selected chips
    const selectedBrandLogos = {};

// Get all brand logos with the 'active' class
    $('.brand_logo .icon_box.active').each(function() {
        var logo = $(this).find('.logo_2').attr('src');
        var chips = $(this).parent().next('.chips').find('.chip.selected').map(function() {
            return $(this).text();
        }).get();

        // Add the selected brand logo and its selected chips to the object
        selectedBrandLogos[logo] = chips;
    });

// Log the selected brand logos and their selected chips to the console
    console.log('selectedBrandLogos',selectedBrandLogos);

    const isSelectedBrandsEmpty = Object.keys(selectedBrandLogos).length === 0
    if (isSelectedBrandsEmpty) {
        $(".modal").addClass('active')
        return
    }

    // console.log(JSON.stringify(selectedBrandLogos))
    saveSelectedBrandLogos(selectedBrandLogos);
    // console.log(window.location)
    // console.log(document.location)
    window.open('simple-betting-2.html', '_self');




    // window.location.assign("/simple-betting-2.html");
    // window.location.assign("/simple-betting-2.html");
}
