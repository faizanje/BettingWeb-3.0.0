$(function () {
    simpleBettingHandler('simple-betting-1');
    populateSelectedBrandLogosProgrammatically();
})

$(document).on('click', '.chip-close', function() {
    // Get the text content of the chip being clicked
    const asset = $(this).parent().prev('img').attr('src');
    const selectedBrands = getSelectedBrandLogos()
    const time = $(this).children('.chip-text').text().trim();
    console.log('asset',asset)
    console.log('selectedBrands',selectedBrands)
    console.log('time',time)
    if (selectedBrands[asset]) {
        console.log('true')
        const times = selectedBrands[asset]
        const index = times.indexOf(time);
        console.log('index',index)
        if (index > -1) {
            console.log('times',times)
            times.splice(index, 1); // remove the time from array
            console.log('new times',times)
            selectedBrands[asset] = times

            if (selectedBrands[asset].length === 0) {
                delete selectedBrands[asset]; // remove the key-value pair if no times are left
                $(this).parent().parent().remove()
            }

            // Remove the chip from the DOM

            console.log('new selectedBrands',selectedBrands)
            $(this).remove();
            saveSelectedBrandLogos(selectedBrands)
        }
    }
});
function populateSelectedBrandLogosProgrammatically() {
    const selectedBrandLogos = getSelectedBrandLogos()
    const parentElement = $('.company_icon_column');

// Loop through the JSON object and generate HTML for each item
    $.each(selectedBrandLogos, function (key, values) {
        const image = $('<img>', {src: key});
        const chips = $('<div>', {class: 'chips'});

        // Loop through the values and generate HTML for each chip
        $.each(values, function (index, value) {
            // const chip = $('<div>', {class: 'chip-close', text: value});
            const chip = `<div class="chip-close">
                                                <span class="chip-text">${value}</span>
                                                <span class="close-btn">&times;</span>
                                            </div>`;
            chips.append(chip);
        });

        // Create a container for the image and chips, and append it to the parent element
        const container = $('<div>', {class: 'flex-row'});
        container.append(image, chips);
        parentElement.append(container);
    });
    for (let brand in selectedBrandLogos) {
        const times = selectedBrandLogos[brand]
    }
}

function getImgChipElement(image, times) {
    return `<img src="${image}" className="bk_2" alt="">`;
}


