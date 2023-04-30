$(function () {
    simpleBettingHandler('simple-betting-1');
    populateSelectedBrandLogosProgrammatically();
    populateBetTitle();


    $('.logo').click(function () {

        const selectedBrands = getSelectedBrandLogos()
        $(this).hide()
        const src = $(this).attr('src');
        console.log(src)
        delete selectedBrands[src]
        saveSelectedBrandLogos(selectedBrands)
    })
})