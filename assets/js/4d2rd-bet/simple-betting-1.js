
$(function () {
    // simpleBettingHandler('simple-betting-1');
    selectBrandsOnStartup();
    // populateSelectedBrandLogosProgrammatically();
    // populateBetTitle();
})
//
// $(".icon_box").click(function () {
//     $(this).toggleClass("active");
// });
//
// $(".chip").click(function () {
//     $(this).toggleClass("selected");
// });

function selectBrandsOnStartup() {
    console.log('selectBrandsOnStartup')
    const brands = getSelectedBrandLogos()
    Object.entries(brands).forEach(([key,value]) => {
        console.log(key,value)
    })
}


function handleNextSimpleBetting4d2rd() {
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


    // assuming selectedBrands is the object with key-value pairs
    const valuesArray = Object.values(selectedBrandLogos);

    const hasEmptyTime = valuesArray.some((timesArray) => timesArray.length === 0);

    const isSelectedBrandsEmpty = Object.keys(selectedBrandLogos).length === 0
    if (isSelectedBrandsEmpty || hasEmptyTime) {
        $(".modal").addClass('active')
        return
    }


    // Save selected brand logos in session storage so it can be retrieved in next page
    console.log(JSON.stringify(selectedBrandLogos))
    window.sessionStorage.setItem("selectedBrandLogos", JSON.stringify(selectedBrandLogos))
    // console.log(window.location)
    // console.log(document.location)
    window.open('simple-betting-2.html', '_self');



    // window.location.assign("/simple-betting-2.html");
    // window.location.assign("/simple-betting-2.html");
}
